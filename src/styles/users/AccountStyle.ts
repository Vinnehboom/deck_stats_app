import { StyleSheet } from "react-native";

import { Spacing, screenHeight } from "../variables";

export const AccountStyle = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: screenHeight * 0.85,
  },
  details: {
    display: "flex",
    justifyContent: "center",
    marginBottom: Spacing.xs,
  },
  signOutButton: {
    alignSelf: "center",
    marginTop: Spacing.sm,
  },
});
