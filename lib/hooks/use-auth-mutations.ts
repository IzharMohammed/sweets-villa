"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { queryKeys } from "@/lib/api/query-keys";
import { sendOtp, verifyOtp } from "@/lib/api/client-actions";
import { toast } from "sonner";

/**
 * Mutation hook for sending OTP
 */
export function useSendOtp() {
    return useMutation({
        mutationFn: (phoneNumber: string) => sendOtp(phoneNumber),

        onSuccess: (data) => {
            if (data?.success) {
                toast.success(data?.message || "OTP sent successfully!");
            } else {
                toast.error(data?.error || "Failed to send OTP");
            }
        },

        onError: (error: any) => {
            const errorMessage = error?.message || "Failed to send OTP";
            toast.error(errorMessage);
        },
    });
}

interface VerifyOtpParams {
    phoneNumber: string;
    code: string;
    disableSession?: boolean;
    updatePhoneNumber?: boolean;
}

/**
 * Mutation hook for verifying OTP
 * Invalidates cart and auth after successful verification
 */
export function useVerifyOtp() {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: ({ phoneNumber, code, disableSession = false, updatePhoneNumber = true }: VerifyOtpParams) =>
            verifyOtp(phoneNumber, code, disableSession, updatePhoneNumber),

        onSuccess: (data) => {
            if (data?.success) {
                // Invalidate cart and auth queries to refetch with new user context
                queryClient.invalidateQueries({ queryKey: queryKeys.cart.all });
                queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
                queryClient.invalidateQueries({ queryKey: queryKeys.products.all });

                toast.success(data?.message || "Phone verified successfully!");
            } else {
                toast.error(data?.error || "Failed to verify OTP");
            }
        },

        onError: (error: any) => {
            const errorMessage = error?.message || "Failed to verify OTP";
            toast.error(errorMessage);
        },
    });
}
