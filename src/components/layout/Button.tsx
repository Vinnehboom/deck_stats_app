import React from "react";
import { Button as NativeButton, IButtonProps, Text } from "native-base";

import { Inputs } from "../../styles/inputs";

type ButtonProps = IButtonProps & { text: string; color?: string };

export const Button = (props: ButtonProps) => {
  return (
    <NativeButton {...props} style={Inputs.button} bgColor={props.color}>
      <Text style={Inputs.buttonText}> {props.text}</Text>
    </NativeButton>
  );
};
