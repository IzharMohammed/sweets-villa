import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();

    const guestToken = req.cookies.get("guest_token");

    // If token doesn't exist → request a new one
    if (!guestToken) {
        try {
            const apiRes = await fetch(`${process.env.BACKEND_URL}/auth/guest`, {
                method: "POST",
                headers: {
                    "x-api-key": process.env.BACKEND_API_KEY!,
                },
            });

            const data = await apiRes.json();
            const newToken = data.guestToken;

            res.cookies.set("guest_token", newToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 60 * 60 * 24 * 90,
                path: "/",
            });
        } catch (err) {
            console.error("Error creating guest token:", err);
        }
    }

    return res;
}

// Apply to all routes except static files
export const config = {
    matcher: ["/((?!_next|static|favicon.ico).*)"],
};
