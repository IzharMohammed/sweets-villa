"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useInitGuestToken } from "@/lib/hooks/useInitGuestToken";
import { queryClient } from "@/lib/api/query-client";

export function Providers({ children }: { children: React.ReactNode }) {
  useInitGuestToken();
  
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
