"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/api/query-keys";
import { removeFromCart } from "@/lib/api/client-actions";
import { toast } from "sonner";

/**
 * Mutation hook for removing items from cart
 * Implements optimistic updates to immediately remove item from UI
 */
export function useRemoveFromCart() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (cartId: string) => removeFromCart(cartId),

        // Optimistically update cart before API call
        onMutate: async (cartId) => {
            // Cancel outgoing refetches
            await queryClient.cancelQueries({ queryKey: queryKeys.cart.items() });

            // Snapshot previous value for rollback
            const previousCart = queryClient.getQueryData(queryKeys.cart.items());

            // Optimistically remove item from cache
            queryClient.setQueryData(queryKeys.cart.items(), (old: any) => {
                if (!old) return old;
                return {
                    ...old,
                    data: old.data.filter((item: any) => item.id !== cartId),
                    count: old.count - 1,
                };
            });

            // Return context with snapshot
            return { previousCart };
        },

        onError: (error: any, variables, context) => {
            // Rollback on error
            if (context?.previousCart) {
                queryClient.setQueryData(queryKeys.cart.items(), context.previousCart);
            }

            // Show error toast
            const errorMessage = error?.message || "Failed to remove item from cart";
            toast.error(errorMessage);
        },

        onSuccess: (data) => {
            // Invalidate cart to refetch fresh data
            queryClient.invalidateQueries({ queryKey: queryKeys.cart.all });

            // Show success toast
            toast.success(data?.message || "Item removed from cart!");
        },
    });
}
