import { StyleSheet } from "react-native";

import { Colors, Typography, Spacing, screenWidth } from "../variables";

export const ListFormStyle = StyleSheet.create({
  button: {
    marginTop: Spacing.md,
  },
  formField: {
    backgroundColor: Colors.light,
  },
  limitlessLink: {
    color: Colors["primary-dark"],
    fontSize: Typography.fontSizes.md,
    fontStyle: "italic",
    fontWeight: "500",
    marginTop: Spacing.md,
    paddingTop: Spacing.sm,
  },
  limitlessLinkIcon: {
    color: Colors["primary-dark"],
    fontSize: Typography.fontSizes.md,
    fontStyle: "italic",
    marginTop: Spacing.xxxl,
    top: Spacing.xs,
  },

  listForm: {
    alignItems: "center",
    minWidth: screenWidth - screenWidth / 10,
    paddingHorizontal: screenWidth / 20,
  },
});
