import { Platform, StyleSheet } from "react-native";

import { Colors, Typography, Spacing } from "../variables";

export const TabBarStyle = StyleSheet.create({
  bar: { backgroundColor: Colors.white, borderTopWidth: 0, paddingVertical: Spacing.xxs },
  item: {
    alignSelf: "center",
    backgroundColor: Colors.primary,
    borderColor: Colors["primary-dark"],
    borderRadius: Platform.OS === "ios" ? 15 : 5,
    borderWidth: 0.2,
    elevation: 15,
    marginHorizontal: Spacing.xs,
    marginVertical: 1,
    paddingHorizontal: Spacing.xxs,
    paddingTop: Platform.OS === "ios" ? "1%" : "3%",
    paddingVertical: Platform.OS === "ios" ? "1%" : "1%",
    shadowColor: "rgba(0,0,0,0.6)",
    shadowOffset: { height: 3, width: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 0,
  },
  label: { fontFamily: "BungeeInline-Regular", fontSize: Typography.fontSizes.md },
});
