import { StyleSheet } from "react-native";

import { colors } from "../../utils/colors";

export const ListPaginationStyle = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 25,
    position: "relative",
    width: "100%",
  },
  dot: {
    alignItems: "center",
    backgroundColor: colors["primary-dark"],
    borderRadius: 6,
    height: 12,
    marginHorizontal: 3,
    width: 12,
  },
});
