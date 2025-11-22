import { queryClient } from "@/lib/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";

// Lazy load devtools only in development
const ReactQueryDevtools = lazy(() =>
  import("@tanstack/react-query-devtools").then((m) => ({
    default: m.ReactQueryDevtools,
  }))
);

interface TanstackQueryProviderProps {
  children: React.ReactNode;
}

export const TanstackQueryProvider = ({ children }: TanstackQueryProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {import.meta.env.DEV && (
        <Suspense fallback={null}>
          <ReactQueryDevtools />
        </Suspense>
      )}
      {children}
    </QueryClientProvider>
  );
};
