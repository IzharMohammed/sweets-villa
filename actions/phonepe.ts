"use server";

import crypto from "crypto";
import { updateOrder } from "./order";

export async function initiatePhonePePayment(
    amount: number,
    orderId: string,
    mobileNumber: string
) {
    try {
        const merchantId = process.env.PHONEPE_MERCHANT_ID;
        const saltKey = process.env.PHONEPE_SALT_KEY;
        const saltIndex = process.env.PHONEPE_SALT_INDEX;
        const hostUrl = process.env.PHONEPE_HOST_URL;
        const appUrl = process.env.NEXT_PUBLIC_APP_URL;

        if (!merchantId || !saltKey || !saltIndex || !hostUrl || !appUrl) {
            throw new Error("Missing PhonePe environment variables");
        }

        const payload = {
            merchantId: merchantId,
            merchantTransactionId: orderId, // Using orderId as transaction ID
            merchantUserId: "MUID" + Date.now(), // Unique user ID
            amount: Math.round(amount * 100), // Amount in paise
            redirectUrl: `${appUrl}/checkout/status?id=${orderId}`,
            redirectMode: "REDIRECT",
            callbackUrl: `${appUrl}/api/phonepe/callback`,
            mobileNumber: mobileNumber,
            paymentInstrument: {
                type: "PAY_PAGE",
            },
        };

        const base64Payload = Buffer.from(JSON.stringify(payload)).toString("base64");
        const stringToSign = base64Payload + "/pg/v1/pay" + saltKey;
        const sha256 = crypto.createHash("sha256").update(stringToSign).digest("hex");
        const checksum = sha256 + "###" + saltIndex;

        const response = await fetch(`${hostUrl}/pg/v1/pay`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-VERIFY": checksum,
            },
            body: JSON.stringify({
                request: base64Payload,
            }),
        });

        const data = await response.json();
        
        if (data.success) {
            return {
                success: true,
                redirectUrl: data.data.instrumentResponse.redirectInfo.url,
                merchantTransactionId: data.data.merchantTransactionId,
            };
        } else {
            console.error("PhonePe Initiation Error:", data);
            return {
                success: false,
                error: data.message || "Failed to initiate payment",
            };
        }
    } catch (error) {
        console.error("Error initiating PhonePe payment:", error);
        return {
            success: false,
            error: "Internal server error during payment initiation",
        };
    }
}

export async function checkPaymentStatus(merchantTransactionId: string) {
    try {
        const merchantId = process.env.PHONEPE_MERCHANT_ID;
        const saltKey = process.env.PHONEPE_SALT_KEY;
        const saltIndex = process.env.PHONEPE_SALT_INDEX;
        const hostUrl = process.env.PHONEPE_HOST_URL;

        if (!merchantId || !saltKey || !saltIndex || !hostUrl) {
            throw new Error("Missing PhonePe environment variables");
        }

        const stringToSign =
            `/pg/v1/status/${merchantId}/${merchantTransactionId}` + saltKey;
        const sha256 = crypto.createHash("sha256").update(stringToSign).digest("hex");
        const checksum = sha256 + "###" + saltIndex;

        const response = await fetch(
            `${hostUrl}/pg/v1/status/${merchantId}/${merchantTransactionId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-VERIFY": checksum,
                    "X-MERCHANT-ID": merchantId,
                },
            }
        );

        const data = await response.json();

        if (data.success && data.code === "PAYMENT_SUCCESS") {
            return {
                success: true,
                status: "COMPLETED", // Or whatever status your app uses
                data: data.data,
            };
        } else {
            return {
                success: false,
                status: data.code === "PAYMENT_PENDING" ? "PENDING" : "FAILED",
                message: data.message,
            };
        }
    } catch (error) {
        console.error("Error checking PhonePe payment status:", error);
        return {
            success: false,
            error: "Failed to check payment status",
        };
    }
}

export async function verifyAndCompleteOrder(orderId: string) {
    try {
        // 1. Check Payment Status
        const statusResult = await checkPaymentStatus(orderId);
        console.log("statusResult", statusResult);

        if (!statusResult.success || statusResult.status !== "COMPLETED") {
            return {
                success: false,
                message: statusResult.message || "Payment not completed",
                status: statusResult.status,
            };
        }

        // 2. Update Order in Backend
        const updateResult = await updateOrder(orderId, {
            payment: {
                gateway: "PHONEPE",
                method: statusResult.data.paymentInstrument.type,
                status: "AUTHORIZED",
                amount: statusResult.data.amount / 100, // Convert back to main unit
                currency: "INR",
                gatewayOrderId: statusResult.data.merchantTransactionId,
                gatewayPaymentId: statusResult.data.transactionId,
            },
        });
        console.log("updateResult", updateResult);

        if (!updateResult.success) {
            return {
                success: false,
                message: "Payment successful but failed to update order. Please contact support.",
            };
        }

        return {
            success: true,
            message: "Order placed successfully!",
        };
    } catch (error) {
        console.error("Error in verifyAndCompleteOrder:", error);
        return {
            success: false,
            message: "Something went wrong during verification",
        };
    }
}
