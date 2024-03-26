import { Platform, StyleSheet } from "react-native";

import { colors } from "../../utils/colors";

export const TabBarStyle = StyleSheet.create({
  bar: { backgroundColor: colors.white, borderTopWidth: 0, paddingVertical: "1%" },
  item: {
    alignSelf: "center",
    backgroundColor: colors.primary,
    borderColor: colors["primary-dark"],
    borderRadius: Platform.OS === "ios" ? 15 : 5,
    borderWidth: 0.2,
    elevation: 15,
    marginHorizontal: 5,
    marginVertical: 1,
    paddingHorizontal: 5,
    paddingTop: Platform.OS === "ios" ? "1%" : "3%",
    paddingVertical: Platform.OS === "ios" ? "1%" : "1%",
    shadowColor: "rgba(0,0,0,0.6)",
    shadowOffset: { height: 3, width: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 0,
  },
  label: { fontFamily: "BungeeInline-Regular", fontSize: 13 },
});
