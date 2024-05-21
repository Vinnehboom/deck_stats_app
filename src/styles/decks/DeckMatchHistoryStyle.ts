import { StyleSheet } from "react-native";

import { Spacing, Colors, Typography } from "../variables";

export const DeckMatchHistoryStyle = StyleSheet.create({
  deleteIcon: { color: Colors.red, marginLeft: Spacing.lg, marginTop: Spacing.lg, top: Spacing.xxs },
  deleteLink: {
    color: Colors.red,
    fontSize: Typography.fontSizes.lg,
    paddingBottom: Spacing.md,
    paddingTop: Spacing.sm,
    textDecorationLine: "underline",
  },
  exportIcon: { color: Colors["primary-dark"], marginLeft: Spacing.lg, marginTop: Spacing.lg, top: Spacing.md },
  exportLink: {
    color: Colors["primary-dark"],
    fontSize: Typography.fontSizes.lg,
    paddingBottom: Spacing.md,
    paddingTop: Spacing.sm,
    textDecorationLine: "underline",
  },
  exportText: {
    fontStyle: "italic",
    marginBottom: Spacing.sm,
    textAlign: "center",
  },
});
