interface ServerAuthResponse {
    isAuthenticated: boolean,
    user: Record<string, any> | null,
    token: string | null,
    guestToken: string | null,

}

/**
 * Smart server-side auth helper
 * - Detects logged in user
 * - Ensures guest token exists
 * - Auto-creates guest token if missing
 */

import { cookieManager } from "@/utils/authTools";
import { cookies } from "next/headers";

export async function useServerAuth(): Promise<ServerAuthResponse> {
    const cookieStore = await cookies();

    //1.checks if user is logged in
    const user = await cookieManager.getAuthUser();
    const authToken = await cookieManager.getAuthToken();

    if (user && authToken) {
        return {
            isAuthenticated: true,
            user,
            token: authToken,
            guestToken: null,
        }
    }

    // 2. Guest user → ensure guest token exists
    const guestToken = await cookieManager.getGuestToken();

    if (!guestToken) {
        // set guest token here
    }

    return {
        isAuthenticated: false,
        guestToken,
        token: null,
        user: null,
    }
}