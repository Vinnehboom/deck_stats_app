import { StyleSheet } from "react-native";

import { Colors, Typography, Spacing, screenHeight } from "../variables";

export const MatchRecordFormStyle = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.md,
    paddingHorizontal: Spacing.sm,
    position: "relative",
    top: "-3%",
    width: "96%",
    zIndex: -1,
  },
  input: {
    backgroundColor: Colors.white,
  },
  inputBox: {
    zIndex: -1,
  },
  listSelect: {
    fontSize: Typography.fontSizes.md,
    height: screenHeight / 25,
    width: "100%",
  },
});
