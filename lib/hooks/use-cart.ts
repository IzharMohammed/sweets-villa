"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/api/query-keys";
import { getCartItems } from "@/lib/api/client-actions";

/**
 * Hook for fetching cart items
 * Configured with 1 minute stale time and refetchOnWindowFocus
 * since cart data needs to be fresh
 */
export function useCart() {
    return useQuery({
        queryKey: queryKeys.cart.items(),
        queryFn: getCartItems,
        staleTime: 1000 * 60, // 1 minute - cart needs to be fresh
        refetchOnWindowFocus: true, // Refetch when user returns to tab
        refetchOnMount: true, // Always refetch on mount
    });
}
