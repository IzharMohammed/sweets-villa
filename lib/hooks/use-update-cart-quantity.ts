"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/api/query-keys";
import { updateCartQuantity } from "@/lib/api/client-actions";
import { toast } from "sonner";

interface UpdateCartQuantityParams {
    cartId: string;
    newQuantity: number;
}

/**
 * Mutation hook for updating cart item quantity
 * Implements optimistic updates for instant quantity changes
 */
export function useUpdateCartQuantity() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ cartId, newQuantity }: UpdateCartQuantityParams) =>
            updateCartQuantity(cartId, newQuantity),

        // Optimistically update cart before API call
        onMutate: async ({ cartId, newQuantity }) => {
            // Cancel outgoing refetches
            await queryClient.cancelQueries({ queryKey: queryKeys.cart.items() });

            // Snapshot previous value for rollback
            const previousCart = queryClient.getQueryData(queryKeys.cart.items());

            // Optimistically update quantity in cache
            queryClient.setQueryData(queryKeys.cart.items(), (old: any) => {
                if (!old) return old;
                return {
                    ...old,
                    data: old.data.map((item: any) =>
                        item.id === cartId
                            ? {
                                ...item,
                                quantity: newQuantity,
                                lineTotal: item.variant.finalPrice * newQuantity,
                            }
                            : item
                    ),
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
            const errorMessage = error?.message || "Failed to update quantity";
            toast.error(errorMessage);
        },

        onSuccess: (data) => {
            // Invalidate cart to refetch fresh data
            queryClient.invalidateQueries({ queryKey: queryKeys.cart.all });

            // Optional: Show success toast only on explicit user actions
            // Commenting out to avoid too many toasts during quantity updates
            // toast.success(data?.message || "Quantity updated!");
        },
    });
}
