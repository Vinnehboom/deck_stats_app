import { Text as BaseText } from "native-base";
import { ComponentProps } from "react";
import React from "react";

type NativeBaseTextProps = ComponentProps<typeof BaseText>;

export const Text = (props: NativeBaseTextProps) => {
  return (
    <BaseText fontFamily="Halcom-Regular" {...props}>
      {props?.children}
    </BaseText>
  );
};
