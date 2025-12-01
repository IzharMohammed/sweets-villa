"use server";

import { cookieManager } from "@/utils/authTools";
import { revalidateTag } from "next/cache";

const API_KEY = process.env.BACKEND_API_KEY || "";
const BACKEND_URL = process.env.BACKEND_URL || "";

export interface OrderItem {
    id: string;
    price: number;
    quantity: number;
    product: {
        name: string;
        image: string[];
    };
    variantId: string;
}

export interface ShippingAddress {
    street: string;
    zipCode: string;
    city?: string;
    state?: string;
    country?: string;
}

export interface Order {
    id: string;
    createdAt: string;
    status: string;
    total: number;
    items: OrderItem[];
    shippingAddress: ShippingAddress | null;
    payments: {
        id: string;
        status: string;
        amount: number;
        method: string;
        gateway: string;
    }[];
}

export interface OrdersResponse {
    success: boolean;
    data: Order[];
    count: number;
    message: string;
}

export async function getOrders(): Promise<OrdersResponse> {
    // Check if environment variables are set
    if (!API_KEY || !BACKEND_URL) {
        console.error(
            "Missing environment variables: BACKEND_API_KEY or BACKEND_URL"
        );
        throw new Error("Server configuration error");
    }

    try {
        const headers = await cookieManager.buildApiHeaders();

        const response = await fetch(`${BACKEND_URL}/v1/order`, {
            method: "GET",
            headers,
            cache: "no-store", // Ensure fresh data on each request
            next: {
                tags: ["orders"],
            },
        });

        // await cookieManager.handleApiResponse(response);

        if (!response.ok) {
            throw new Error("Failed to fetch orders");
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
}

export async function createOrder(orderData: {
    items: any[];
    total: number;
    payment: {
        gateway: string;
        method: string;
        status: string;
        amount: number | string;
        currency: string;
        gatewayOrderId?: string;
        gatewayPaymentId?: string;
        gatewaySignature?: string;
    };
    shippingAddress?: {
        street: string;
        zipCode: string;
        city?: string;
        state?: string;
        country?: string;
    };
    fromCart?: boolean;
}) {
    // Check if environment variables are set
    if (!API_KEY || !BACKEND_URL) {
        console.error(
            "Missing environment variables: BACKEND_API_KEY or BACKEND_URL"
        );
        return {
            success: false,
            message: "Server configuration error. Please try again later.",
        };
    }
    console.log("orderData from actions", orderData);

    // Basic validation
    if (!orderData.items || orderData.items.length === 0) {
        return {
            success: false,
            message: "Customer email and order items are required",
        };
    }

    try {
        const headers = await cookieManager.buildApiHeaders();

        const response = await fetch(`${BACKEND_URL}/v1/order`, {
            method: "POST",
            headers,
            body: JSON.stringify(orderData),
            next: {
                tags: ["orders", "cart"],
            },
        });
        console.log("response from order", response);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to create order");
        }

        const result = await response.json();

        // Revalidate both orders and cart tags since order creation affects both
        revalidateTag("orders", "max");
        revalidateTag("cart", "max");

        return {
            success: true,
            message: "Order placed successfully!",
        };
    } catch (error) {
        console.error("Error creating order:", error);
        return {
            success: false,
            message:
                error instanceof Error ? error.message : "Failed to create order",
        };
    }
}

