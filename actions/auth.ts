"use server";

import { cookieManager } from "@/utils/authTools";
import { revalidateTag } from "next/cache";

const API_KEY = process.env.BACKEND_API_KEY || "";
const BACKEND_URL = process.env.BACKEND_URL || "";

export async function sendOtp(phoneNumber: string) {
    if (!API_KEY || !BACKEND_URL) {
        console.error(
            "Missing environment variables: BACKEND_API_KEY or BACKEND_URL"
        );
        return {
            success: false,
            error: "Server configuration error"
        };
    }

    try {
        if (!phoneNumber || phoneNumber.length < 10) {
            return {
                success: false,
                error: "Invalid phone number"
            };
        }

        const response = await fetch(`${BACKEND_URL}/v1/auth/phone-number/send-otp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": API_KEY,
            },
            body: JSON.stringify({
                phoneNumber
            }),
            cache: "no-store",
        });

        console.log("OTP send request initiated");

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return {
                success: false,
                error: errorData.error || `Error ${response.status}: Failed to send OTP`
            };
        }

        const data = await response.json();
        return {
            success: true,
            message: data.message || "OTP sent successfully",
            ...data
        };

    } catch (error) {
        console.error("Error sending OTP:", error);
        return {
            success: false,
            error: "Failed to send OTP. Please try again."
        };
    }
}

export async function verifyOtp(
    phoneNumber: string,
    code: string,
    disableSession: boolean = false,
    updatePhoneNumber: boolean = true
) {
    if (!API_KEY || !BACKEND_URL) {
        console.error(
            "Missing environment variables: BACKEND_API_KEY or BACKEND_URL"
        );
        return {
            success: false,
            error: "Server configuration error"
        };
    }

    try {
        if (!phoneNumber || phoneNumber.length < 10) {
            return {
                success: false,
                error: "Invalid phone number"
            };
        }

        if (!code || code.length !== 6) {
            return {
                success: false,
                error: "Invalid OTP code"
            };
        }

        const response = await fetch(`${BACKEND_URL}/v1/auth/phone-number/verify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": API_KEY,
            },
            body: JSON.stringify({
                phoneNumber,
                code,
                disableSession,
                updatePhoneNumber
            }),
            cache: "no-store",
        });

        console.log("OTP verification request completed");

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return {
                success: false,
                error: errorData.error || `Error ${response.status}: Failed to verify OTP`
            };
        }

        const data = await response.json();

        // If verification successful and not disabling session, handle user data
        if (data.success && data.user && !disableSession) {
            // Store user data if needed
            if (data.user.id) {
                await cookieManager.setAuthenticatedUser({
                    token: data.token || "",
                    user: {
                        id: data.user.id,
                        phone: data.user.phone,
                        email: data.user.email,
                        phoneNumberVerified: data.user.phoneNumberVerified
                    }
                });
            }
        }

        // Revalidate any tags that depend on auth state
        revalidateTag("cart", "max");
        revalidateTag("products", "max");

        return {
            success: true,
            message: data.message || "Phone verified successfully",
            user: data.user,
            ...data
        };

    } catch (error) {
        console.error("Error verifying OTP:", error);
        return {
            success: false,
            error: "Failed to verify OTP. Please try again."
        };
    }
}

export async function resendOtp(phoneNumber: string) {
    // Same as sendOtp - can be used for rate limiting or different UI flow
    return sendOtp(phoneNumber);
}