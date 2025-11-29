"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/api/query-keys";
import { getProductDetails } from "@/lib/api/client-actions";

/**
 * Hook for fetching individual product details
 * Configured with 10 minute stale time since product details are very stable
 */
export function useProductDetails(productId: string) {
    return useQuery({
        queryKey: queryKeys.products.detail(productId),
        queryFn: () => getProductDetails(productId),
        staleTime: 1000 * 60 * 10, // 10 minutes - product details very stable
        enabled: !!productId, // Only run if productId exists
    });
}
