import { StyleSheet } from "react-native";

import { Typography, Spacing } from "../variables";

export const MatchRecordListItemStyle = StyleSheet.create({
  coinflip: {
    alignSelf: "center",
    height: 30,
    resizeMode: "contain",
    width: 30,
  },
  listItem: {
    alignSelf: "center",
    marginVertical: Spacing.xxs,
    width: "100%",
  },

  litItemText: { alignSelf: "center", fontSize: Typography.fontSizes.xl, fontWeight: "bold" },
  remarks: {
    padding: Spacing.xxs,
  },
});
