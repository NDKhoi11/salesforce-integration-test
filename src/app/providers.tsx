"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";

type Props = {
  children?: React.ReactNode;
  session?: any;
};

export const Providers = ({ children, session }: Props) => {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
        },
      },
    })
  );

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <AntdRegistry>{children}</AntdRegistry>
      </QueryClientProvider>
    </SessionProvider>
  );
};
