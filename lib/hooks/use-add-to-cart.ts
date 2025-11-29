"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/api/query-keys";
import { addToCart } from "@/lib/api/client-actions";
import { toast } from "sonner";

interface AddToCartParams {
    productId: string;
    variantId: string;
    quantity: number;
}

/**
 * Mutation hook for adding items to cart
 * Implements optimistic updates for instant UI feedback
 */
export function useAddToCart() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ productId, variantId, quantity }: AddToCartParams) =>
            addToCart(productId, variantId, quantity),

        // Optimistically update cart before API call
        onMutate: async (variables) => {
            // Cancel outgoing refetches
            await queryClient.cancelQueries({ queryKey: queryKeys.cart.items() });

            // Snapshot previous value for rollback
            const previousCart = queryClient.getQueryData(queryKeys.cart.items());

            // Return context with snapshot
            return { previousCart };
        },

        onError: (error: any, variables, context) => {
            // Rollback on error
            if (context?.previousCart) {
                queryClient.setQueryData(queryKeys.cart.items(), context.previousCart);
            }

            // Show error toast
            const errorMessage = error?.message || "Failed to add item to cart";
            toast.error(errorMessage);
        },

        onSuccess: (data) => {
            // Invalidate cart to refetch fresh data
            queryClient.invalidateQueries({ queryKey: queryKeys.cart.all });

            // Show success toast
            toast.success(data?.message || "Item added to cart!");
        },
    });
}
