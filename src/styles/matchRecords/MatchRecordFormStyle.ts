import { StyleSheet } from "react-native";

import { Colors, Typography, Spacing, screenHeight } from "../variables";

export const MatchRecordFormStyle = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.md,
    paddingHorizontal: Spacing.sm,
    paddingTop: Spacing.md,
    position: "relative",
    top: "-3%",
    width: "96%",
    zIndex: -1,
  },
  deckLink: {
    color: Colors["primary-dark"],
    fontSize: Typography.fontSizes.md,
    fontWeight: "500",
    marginBottom: "-" + Spacing.sm,
    marginVertical: Spacing.sm,
    textDecorationLine: "underline",
  },
  input: {
    backgroundColor: Colors.white,
  },
  inputBox: {
    marginTop: "-" + Spacing.xxs,
    zIndex: -1,
  },
  listSelect: {
    fontSize: Typography.fontSizes.md,
    height: screenHeight / 25,
    width: "100%",
  },
  remarkCount: {
    fontSize: Typography.fontSizes.sm,
    marginTop: Spacing.md,
  },
});
