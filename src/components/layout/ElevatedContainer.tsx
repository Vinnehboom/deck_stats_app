import { Box, IBoxProps } from "native-base";
import React from "react";

import { Colors } from "../../styles/variables";
import { ElevatedContainerStyle } from "../../styles/layout/ElevatedContainerStyle";

export const ElevatedContainer = (props: IBoxProps) => {
  return (
    <Box {...props} bgColor={Colors.light} style={[ElevatedContainerStyle.container, props.style]}>
      {props.children}
    </Box>
  );
};
