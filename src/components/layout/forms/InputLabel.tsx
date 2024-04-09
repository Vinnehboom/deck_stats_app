import { Text, ITextProps } from "native-base";
import React from "react";

import { Inputs } from "../../../styles/inputs";

export const InputLabel = (props: ITextProps) => {
  return (
    <Text paddingTop={2} style={Inputs.inputLabel}>
      {props.children}
    </Text>
  );
};
