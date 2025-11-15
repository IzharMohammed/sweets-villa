import "server-only";
import { cookies } from "next/headers";

interface LoginResponse {
    token: string;
    user: {
        id: string | number;
        [key: string]: any;
    };
}

export class CookieManager {
    private AUTH_TOKEN_KEY = "auth_token";
    private USER_DATA_KEY = "user_data";
    private GUEST_TOKEN_KEY = "guest_token";

    // ========= AUTHENTICATED USER =========
    async setAuthenticatedUser(loginResponse: LoginResponse): Promise<void> {
        const cookieStore = await cookies();

        cookieStore.set(this.AUTH_TOKEN_KEY, loginResponse.token, {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 90,
        });

        cookieStore.set(this.USER_DATA_KEY, JSON.stringify(loginResponse.user), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 90,
        });

        await this.clearGuestToken();
    }

    async getAuthUser(): Promise<Record<string, any> | null> {
        const cookieStore = await cookies();
        const userData = cookieStore.get(this.USER_DATA_KEY);

        if (!userData?.value) return null;

        try {
            const decoded = decodeURIComponent(userData.value);
            return JSON.parse(decoded);
        } catch (error) {
            console.error("Error parsing user cookie:", error);
            return null;
        }
    }

    async getAuthToken(): Promise<string | null> {
        const cookieStore = await cookies();
        return cookieStore.get(this.AUTH_TOKEN_KEY)?.value || null;
    }

    async clearAuthCookies(): Promise<void> {
        const cookieStore = await cookies();
        cookieStore.delete(this.AUTH_TOKEN_KEY);
        cookieStore.delete(this.USER_DATA_KEY);
    }

    async isAuthenticated(): Promise<boolean> {
        const token = await this.getAuthToken();
        const user = await this.getAuthUser();
        return !!(token && user);
    }

    // ========= GUEST TOKEN =========
    async setGuestToken(token: string): Promise<void> {
        const cookieStore = await cookies();
        cookieStore.set(this.GUEST_TOKEN_KEY, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 90,
            path: "/",
        });
    }

    async getGuestToken(): Promise<string | null> {
        const cookieStore = await cookies();
        return cookieStore.get(this.GUEST_TOKEN_KEY)?.value || null;
    }

    async clearGuestToken(): Promise<void> {
        const cookieStore = await cookies();
        cookieStore.delete(this.GUEST_TOKEN_KEY);
    }

    // ========= API BUILD HEADERS =========
    async buildApiHeaders(): Promise<Record<string, string>> {
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
            "x-api-key": process.env.BACKEND_API_KEY || "",
        };

        const user = await this.getAuthUser();
        if (user?.id) {
            headers["x-customer-id"] = String(user.id);
        } else {
            const guestToken = await this.getGuestToken();
            if (guestToken) headers["x-guest-token"] = guestToken;
        }

        return headers;
    }

    // ========= HANDLE RESPONSE =========
    async handleApiResponse(response: Response): Promise<void> {
        const newGuestToken = response.headers.get("x-guest-token");
        if (newGuestToken) {
            await this.setGuestToken(newGuestToken);
        }
    }
}

export const cookieManager = new CookieManager();