import { NextRequest, NextResponse } from "next/server";
import { GUEST_TOKEN_KEY } from "@/constants";
import { cookieManager } from "@/utils/authTools";

const BACKEND_URL = process.env.BACKEND_URL || "";
const API_KEY = process.env.BACKEND_API_KEY || "";

/**
 * This route handles guest token initialization.
 */

export async function GET(request: NextRequest) {
    try {
        const existingToken = request.cookies.get(GUEST_TOKEN_KEY)?.value;
        const user_data = await cookieManager.getAuthUser()
        console.log("Initializing guest token...");
        console.log("Existing token:", existingToken ? "YES" : "NO");

        console.log("user data", user_data ? "YES" : "NO");
        console.log("user data", user_data);

        if (existingToken) {
            return NextResponse.json(
                { token: existingToken, success: true, cached: true },
                { status: 200 }
            );
        }

        if (user_data) {
            return NextResponse.json(
                { message: "user is authenticated", success: true },
                { status: 200 }
            )
        }
        // Call backend - include existing token if available
        const backendResponse = await fetch(`${BACKEND_URL}/v1/cart`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": API_KEY,
                ...(existingToken && { "x-guest-token": existingToken }),
            },
            cache: "no-store",
        });

        console.log("backendResponse", backendResponse);

        const newToken = backendResponse.headers.get("x-guest-token");

        if (!newToken) {
            return NextResponse.json(
                { error: "Failed to get guest token from backend" },
                { status: 500 }
            );
        }

        const response = NextResponse.json(
            { token: newToken, success: true },
            { status: 200 }
        );

        // Set token as httpOnly cookie
        response.cookies.set(GUEST_TOKEN_KEY, newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 90, // 90 days
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Error initializing guest token:", error);
        return NextResponse.json(
            { error: "Failed to initialize guest token" },
            { status: 500 }
        );
    }
}