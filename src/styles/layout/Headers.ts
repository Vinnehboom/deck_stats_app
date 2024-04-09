import { StyleSheet, TextStyle } from "react-native";

import { Typography } from "../variables/typography";

const baseStyle: TextStyle = {
  textAlign: "center",
};

export const Headers = StyleSheet.create({
  h1: {
    fontSize: Typography.headers.h1,
    fontWeight: "800",
    paddingVertical: 24,
    ...baseStyle,
  },
  h2: {
    fontSize: Typography.headers.h2,
    fontWeight: "700",
    paddingVertical: 16,
    ...baseStyle,
  },
  h3: {
    fontSize: Typography.headers.h3,
    fontWeight: "600",
    paddingVertical: 12,
    ...baseStyle,
  },
  h4: {
    fontSize: Typography.headers.h4,
    fontWeight: "normal",
    paddingVertical: 12,
    ...baseStyle,
  },
  h5: {
    fontSize: Typography.headers.h5,
    fontWeight: "normal",
    paddingVertical: 8,
    ...baseStyle,
  },
});
