import "server-only";
import { cookies } from "next/headers";

class CookieManager {
    AUTH_TOKEN_KEY = "auth_token";
    USER_DATA_KEY = "user_data";
    GUEST_TOKEN_KEY = "guest_token";

    // ========== Authenticated User Methods ==========
    async setAuthenticatedUser(loginResponse: any) {
        const cookieStore = await cookies();

        // Set token cookie with security options
        cookieStore.set(this.AUTH_TOKEN_KEY, loginResponse.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 90, // 90 days
        });

        // Set user data cookie
        cookieStore.set(this.USER_DATA_KEY, JSON.stringify(loginResponse.user), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 90, // 90 days
        });

        // Clear guest token when user logs in
        await this.clearGuestToken();
    }

    async getAuthUser() {
        const cookieStore = await cookies();
        const userData = cookieStore.get(this.USER_DATA_KEY);

        if (!userData?.value) {
            return null;
        }

        try {
            // Decode the URL-encoded value first
            const decodedValue = decodeURIComponent(userData.value);
            return JSON.parse(decodedValue);
        } catch (error) {
            console.error("Error parsing user data from cookie:", error);
            return null;
        }
    }

    async getAuthToken() {
        const cookieStore = await cookies();
        const token = cookieStore.get(this.AUTH_TOKEN_KEY);
        return token?.value || null;
    }

    async clearAuthCookies() {
        const cookieStore = await cookies();
        cookieStore.delete(this.AUTH_TOKEN_KEY);
        cookieStore.delete(this.USER_DATA_KEY);
    }

    async isAuthenticated() {
        const token = await this.getAuthToken();
        const user = await this.getAuthUser();
        return !!(token && user);
    }

    // ========== Guest Token Methods ==========
    async setGuestToken(token) {
        const cookieStore = await cookies();
        cookieStore.set(this.GUEST_TOKEN_KEY, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 90, // 90 days (matching backend)
            path: "/",
        });
    }

    async getGuestToken() {
        const cookieStore = await cookies();
        const token = cookieStore.get(this.GUEST_TOKEN_KEY);
        return token?.value || null;
    }

    async clearGuestToken() {
        const cookieStore = await cookies();
        cookieStore.delete(this.GUEST_TOKEN_KEY);
    }

    // ========== Unified API Headers Method ==========
    /**
     * Builds headers for API requests with auth or guest token
     * @returns {Promise<Record<string, string>>}
     */

    async buildApiHeaders() {
        const headers = {
            "Content-Type": "application/json",
            "x-api-key": process.env.BACKEND_API_KEY || "",
        };

        // Check if user is authenticated
        const user = await this.getAuthUser();
        if (user?.id) {
            headers["x-customer-id"] = user.id;
        } else {
            // Add guest token for unauthenticated users
            const guestToken = await this.getGuestToken();
            if (guestToken) {
                headers["x-guest-token"] = guestToken;
            }
        }

        return headers;
    }

    /**
     * Handles API response and stores guest token if present
     * @param {Response} response - Fetch API response object
     */
    async handleApiResponse(response) {
        const newGuestToken = response.headers.get("x-guest-token");
        if (newGuestToken) {
            await this.setGuestToken(newGuestToken);
        }
    }
}

export const cookieManager = new CookieManager();