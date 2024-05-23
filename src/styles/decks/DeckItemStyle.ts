import { StyleSheet } from "react-native";

import { Colors, Spacing, Typography } from "../variables";

export const DeckItemStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: Spacing.xs,
    padding: Spacing.xs,
    shadowColor: Colors.primary,
    shadowOffset: { height: 2, width: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 0,
  },
  deckName: {
    alignItems: "center",
    color: Colors.white,
    fontSize: Typography.fontSizes.lg,
    fontWeight: "500",
    paddingLeft: Spacing.md,
  },
  showLink: {
    fontSize: Typography.fontSizes.lg,
    maxWidth: "15%",
    textDecorationLine: "underline",
  },
});
