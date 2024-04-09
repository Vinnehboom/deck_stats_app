import { StyleSheet } from "react-native";

import { Colors, Spacing, Typography } from "../variables";

export const DeckItemStyle = StyleSheet.create({
  container: {
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: Spacing.xs,
    padding: Spacing.xxs,
  },
  deckName: {
    alignItems: "center",
    fontSize: Typography.fontSizes.lg,
    fontWeight: "500",
    paddingLeft: Spacing.md,
    paddingTop: Spacing.sm,
  },
  showLink: {
    color: Colors["primary-dark"],
    fontSize: Typography.fontSizes.lg,
    paddingTop: Spacing.sm,
    textDecorationLine: "underline",
  },
});
