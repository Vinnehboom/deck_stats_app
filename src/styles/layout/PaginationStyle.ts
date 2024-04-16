import { StyleSheet } from "react-native";

import { Colors, Spacing, Typography } from "../variables";

export const PaginationStyle = StyleSheet.create({
  active: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: "bold",
  },
  container: {
    alignSelf: "center",
    maxWidth: "80%",
    paddingVertical: Spacing.sm,
  },
  link: {
    color: Colors["primary-dark"],
    fontSize: Typography.fontSizes.lg,
    textDecorationLine: "underline",
  },
});
