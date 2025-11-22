"use server";

import Razorpay from "razorpay";
import crypto from "crypto";

export async function createRazorpayOrder(amount: number, currency: string = "INR") {
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID!,
            key_secret: process.env.RAZORPAY_KEY_SECRET!,
        });

        const options = {
            amount: Math.round(amount * 100), // amount in smallest currency unit
            currency,
            receipt: `receipt_${Date.now()}`,
        };

        const order = await instance.orders.create(options);

        return {
            success: true,
            order,
        };
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        return {
            success: false,
            error: "Failed to create payment order",
        };
    }
}

export async function verifyRazorpayPayment(
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string
) {
    try {
        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            return {
                success: true,
                message: "Payment verified successfully",
            };
        } else {
            return {
                success: false,
                message: "Invalid payment signature",
            };
        }
    } catch (error) {
        console.error("Error verifying Razorpay payment:", error);
        return {
            success: false,
            message: "Payment verification failed",
        };
    }
}
