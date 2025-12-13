import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log("PhonePe Callback Received:", JSON.stringify(body, null, 2));

        // TODO: Verify checksum and update order if possible (requires system auth)
        // For now, we rely on the client-side redirection to update the order status
        // using the user's session.

        return NextResponse.json({
            success: true,
            message: "Callback received",
        });
    } catch (error) {
        console.error("Error processing PhonePe callback:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error",
            },
            { status: 500 }
        );
    }
}
