"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/api/query-keys";
import { getOrders } from "@/lib/api/client-actions";

/**
 * Hook for fetching user orders
 * Configured with 3 minute stale time and refetchOnWindowFocus
 */
export function useOrders() {
    return useQuery({
        queryKey: queryKeys.orders.lists(),
        queryFn: getOrders,
        staleTime: 1000 * 60 * 3, // 3 minutes
        refetchOnWindowFocus: true, // Refetch when user returns to tab
    });
}
