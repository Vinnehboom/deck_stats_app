import { TextInput as Input, TextInputProps } from "react-native";
import React from "react";

import { Inputs } from "../../../styles/inputs";
export const TextInput = (props: TextInputProps) => {
  return <Input {...props} style={[Inputs.input, props.style]} />;
};
