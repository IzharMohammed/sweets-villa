import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60, // 1 minute default
            gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
            retry: (failureCount, error: any) => {
                // Don't retry on 4xx errors (client errors)
                if (error?.status >= 400 && error?.status < 500) {
                    return false;
                }
                // Retry up to 2 times for network/server errors
                return failureCount < 2;
            },
            retryDelay: (attemptIndex) =>
                Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff, max 30s
            refetchOnWindowFocus: false, // Override per-query as needed
            refetchOnReconnect: true,
        },
        mutations: {
            retry: 1, // Retry mutations once on failure
        },
    },
});
