"use client";

import { useInitGuestToken } from "@/lib/hooks/useInitGuestToken";

export function Providers({ children }: { children: React.ReactNode }) {
  useInitGuestToken();
  return <>{children}</>;
}
