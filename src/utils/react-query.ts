import {
  HydrationBoundary,
  HydrationBoundaryProps,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { createElement } from "react";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export function RQHydrate(props?: Omit<HydrationBoundaryProps, "state">) {
  const dehydratedState = dehydrate(queryClient);
  return createElement(HydrationBoundary, { state: dehydratedState, ...props });
}
