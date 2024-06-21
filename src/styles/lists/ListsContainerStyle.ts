import { StyleSheet } from "react-native";

import { screenWidth as width, Spacing } from "../variables";

export const ListContainerStyle = StyleSheet.create({
  listsContainer: {
    alignItems: "stretch",
    gap: width / 10,
    justifyContent: "center",
    marginTop: Spacing.xxs,
    minWidth: width,
    paddingBottom: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
});
