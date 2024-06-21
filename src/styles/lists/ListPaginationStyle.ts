import { StyleSheet } from "react-native";

import { Colors, Spacing } from "../variables";

export const ListPaginationStyle = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: Spacing.md,
    position: "relative",
    width: "100%",
  },
  dot: {
    alignItems: "center",
    backgroundColor: Colors["primary-dark"],
    borderRadius: 6,
    height: 12,
    marginHorizontal: Spacing.xxs,
    width: 12,
  },
});
