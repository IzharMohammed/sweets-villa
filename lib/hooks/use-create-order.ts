"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { queryKeys } from "@/lib/api/query-keys";
import { createOrder } from "@/lib/api/client-actions";
import { toast } from "sonner";

/**
 * Mutation hook for creating orders
 * Invalidates cart and orders on success, navigates to orders page
 */
export function useCreateOrder() {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: createOrder,

        onSuccess: (data) => {
            // Clear cart cache
            queryClient.invalidateQueries({ queryKey: queryKeys.cart.all });

            // Refresh orders
            queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });

            // Show success message
            toast.success(data?.message || "Order placed successfully!");

            // Navigate to orders page
            router.push("/orders");
        },

        onError: (error: any) => {
            // Show error toast
            const errorMessage = error?.message || "Failed to create order";
            toast.error(errorMessage);
        },
    });
}
