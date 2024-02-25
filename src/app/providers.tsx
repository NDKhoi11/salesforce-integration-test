import { AntdRegistry } from "@ant-design/nextjs-registry";

type Props = {
  children?: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  return <AntdRegistry>{children}</AntdRegistry>;
};
