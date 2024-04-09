import { Box, IBoxProps } from "native-base";
import React from "react";

import { ElevatedContainerStyle } from "../../styles/layout/ElevatedContainerStyle";

export const ElevatedContainer = (props: IBoxProps) => {
  return (
    <Box {...props} style={[ElevatedContainerStyle.container, props.style]}>
      {props.children}
    </Box>
  );
};
