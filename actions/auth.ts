"use server";

import { CookieManager, cookieManager } from "@/utils/authTools";
import { revalidateTag } from "next/cache";

const API_KEY = process.env.BACKEND_API_KEY || "";
const BACKEND_URL = process.env.BACKEND_URL || "";

export async function getAuthStatus() {
    return await cookieManager.isAuthenticated();
}

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

        const headers = await cookieManager.buildApiHeaders();

        const response = await fetch(`${BACKEND_URL}/v1/auth/phone-number/send-otp`, {
            method: "POST",
            headers,
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
        console.log("data from send-otp", data);

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

        const headers = await cookieManager.buildApiHeaders();
        /**
         * data from verify otp {
         *  success: true,
            message: 'Phone verified successfully',
          status: true,
          token: '',
          user: {
            id: 'cmi9z4rq00000zvlbcztdcfne',
            email: '1987364537@mlsweets.com',
            emailVerified: false,
            name: '1987364537',
            image: null,
            phoneNumber: '1987364537',
            phoneNumberVerified: true,
            createdAt: 2025-11-22T07:34:56.855Z,
            updatedAt: 2025-11-22T07:34:56.855Z
          }
        }
         * 
         * 
         */

        const response = await fetch(`${BACKEND_URL}/v1/auth/phone-number/verify`, {
            method: "POST",
            headers,
            body: JSON.stringify({
                phoneNumber,
                code,
                disableSession,
                updatePhoneNumber
            }),
            cache: "no-store",
        });

        const data = await response.json();
        console.log("data from verify-otp", data);
        console.log("OTP verification request completed");

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return {
                success: false,
                error: errorData.error || `Error ${response.status}: Failed to verify OTP`
            };
        }



        // Get guest token before clearing it
        const guestToken = await cookieManager.getGuestToken();
        console.log("guestToken", guestToken);

        // Set authenticated user cookies
        // await cookieManager.setAuthenticatedUser(data);

        // Merge guest data if guest token exists
        if (guestToken) {
            console.log("Merge guest data");

            try {
                const mergeResponse = await fetch(
                    `${BACKEND_URL}/v1/auth/merge-guest-data`,
                    {
                        method: "POST",
                        headers: {
                            "x-api-key": API_KEY,
                            "x-customer-id": data.user.id,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ guestToken }),
                    }
                );

                console.log("mergeResponse", mergeResponse);

                if (mergeResponse.ok) {
                    const mergeData = await mergeResponse.json();
                    console.log("Guest data merged successfully:", mergeData);
                } else {
                    console.error(
                        "Failed to merge guest data:",
                        await mergeResponse.text()
                    );
                }

                console.log("Guest data merged successfully");
            } catch (error) {
                console.error("Failed to merge guest data:", error);
                // Don't fail signup if merge fails
            }
        }


        // If verification successful and not disabling session, handle user data
        if (data.success && data.user && !disableSession) {
            // Store user data if needed
            console.log("data inside if", data);

            if (data.user.id) {
                await cookieManager.setAuthenticatedUser({
                    token: data.token || "",
                    user: {
                        id: data.user.id,
                        phone: data.user.phone,
                        name: data.user.name,
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