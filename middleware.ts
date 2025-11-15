import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_TOKEN_KEY, GUEST_TOKEN_KEY, USER_DATA_KEY } from "./constants";


const API_KEY = process.env.BACKEND_API_KEY || "";
const BACKEND_URL = process.env.BACKEND_URL || "";

export async function middleware(request: NextRequest) {
    const response = NextResponse.next();

    const guestToken = request.cookies.get(GUEST_TOKEN_KEY);
    const hasAuthToken = request.cookies.get(AUTH_TOKEN_KEY);
    const hasUserData = request.cookies.get(USER_DATA_KEY);

    const isAuthenticated = Boolean(hasAuthToken && hasUserData);
    console.log(isAuthenticated);

    // ========================================
    // CASE 1: User is authenticated
    // ========================================
    if (isAuthenticated) {
        try {
            const parsedUser = JSON.parse(decodeURIComponent(hasUserData?.value ?? ""));

            // Set x-customer-id header for authenticated requests
            if (parsedUser.id) {
                response.headers.set("x-customer-id", parsedUser.id.toString());
            }

            // Remove guest token if exists (user is now authenticated)
            if (guestToken) {
                response.cookies.delete(GUEST_TOKEN_KEY);
            }
        } catch (error) {
            console.error("Cannot parse user_data cookie", error);
        }

        return response;
    }

    // ========================================
    // CASE 2: User is guest
    // ========================================

    // If guest token exists, set it in header
    if (guestToken) {
        response.headers.set("x-guest-token", guestToken.value);
        return response;
    }

    // If no guest token exists, create one
    try {
        console.log("Creating new guest token...");

        const apiResponse = await fetch(`${BACKEND_URL}/v1/cart`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": API_KEY,
            },
            cache: "no-store",
        });

        const newGuestToken = apiResponse.headers.get("x-guest-token");
        console.log("New guest token received:", newGuestToken);

        if (newGuestToken) {
            // Set cookie for future requests
            response.cookies.set(GUEST_TOKEN_KEY, newGuestToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 60 * 60 * 24 * 90, // 90 days
                path: "/",
            });

            // Set header for current request
            response.headers.set("x-guest-token", newGuestToken);
        }
    } catch (err) {
        console.error("Error creating guest token:", err);
    }

    return response;
}

export const config = {
    matcher: ["/((?!_next|static|favicon.ico).*)"],
};