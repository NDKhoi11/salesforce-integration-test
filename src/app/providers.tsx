"use client";

import { queryClient } from "@/utils/react-query";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
  session?: any;
};

export const Providers = ({ children, session }: Props) => {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <AntdRegistry>{children}</AntdRegistry>
      </QueryClientProvider>
    </SessionProvider>
  );
};
