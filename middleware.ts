import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const GUEST_TOKEN_KEY = "guest_token";
const AUTH_TOKEN_KEY = "auth_token";
const USER_DATA_KEY = "user_data";
const API_KEY = process.env.BACKEND_API_KEY || "";
const BACKEND_URL = process.env.BACKEND_URL || "";

export async function middleware(request: NextRequest) {
    const response = NextResponse.next();

    const guestToken = request.cookies.get(GUEST_TOKEN_KEY);
    const hasAuthToken = request.cookies.get(AUTH_TOKEN_KEY);
    const hasUserData = request.cookies.get(USER_DATA_KEY);
    const isAuthenticated = Boolean(hasAuthToken || hasUserData);

    // If authenticated, ensure guest token is removed and do not re-create it
    if (isAuthenticated) {
        if (guestToken) {
            response.cookies.delete(GUEST_TOKEN_KEY);
        }
        return response;
    }

    // If token doesn't exist → request a new one
    if (!guestToken) {
        try {
            const apiResponse = await fetch(`${BACKEND_URL}/v1/cart`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": API_KEY,
                },
                cache: "no-store",
            });

            const newGuestToken = apiResponse.headers.get("x-guest-token");

            if (newGuestToken) {
                response.cookies.set(GUEST_TOKEN_KEY, newGuestToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "lax",
                    maxAge: 60 * 60 * 24 * 90, // 90 days
                    path: "/",
                });
            }
        } catch (err) {
            console.error("Error creating guest token:", err);
        }
    }

    return response;
}

// Apply to all routes except static files
export const config = {
    matcher: ["/((?!_next|static|favicon.ico).*)"],
};
