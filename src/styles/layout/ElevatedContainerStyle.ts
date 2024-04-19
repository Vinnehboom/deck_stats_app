import { StyleSheet } from "react-native";

import { Colors, Spacing } from "../variables";
export const ElevatedContainerStyle = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: 10,
    elevation: 10,
    height: "auto",
    marginHorizontal: Spacing.md,
    padding: Spacing.xxs,
    shadowColor: Colors["primary-dark"],
    shadowOffset: { height: 3, width: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 0,
  },
});
