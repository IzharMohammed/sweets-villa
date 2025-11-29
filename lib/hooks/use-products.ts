"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/api/query-keys";
import { getProducts } from "@/lib/api/client-actions";

interface UseProductsOptions {
    filters?: Record<string, any>;
}

/**
 * Hook for fetching products list with optional filters
 * Configured with 5 minute stale time since products rarely change
 * Extended gcTime keeps data in memory when navigating away
 */
export function useProducts(options: UseProductsOptions = {}) {
    const { filters = {} } = options;

    return useQuery({
        queryKey: queryKeys.products.list(filters),
        queryFn: () => getProducts(filters),
        staleTime: 1000 * 60 * 5, // 5 minutes - products don't change often
        gcTime: 1000 * 60 * 30, // 30 minutes - keep in cache when navigating away
        refetchOnWindowFocus: false,
    });
}
