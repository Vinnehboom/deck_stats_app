import React, { ReactNode, ComponentProps } from "react";

import { Text } from "./Text";
import { Headers } from "../../styles/layout/Headers";

type HeaderProps = ComponentProps<typeof Text> & { header: "h1" | "h2" | "h3" | "h4"; children: ReactNode };

export const Header = (props: HeaderProps) => {
  const { header, children } = props;
  return (
    <Text {...props} style={Headers[header]}>
      {children}
    </Text>
  );
};
