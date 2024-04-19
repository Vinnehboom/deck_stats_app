import { StyleSheet } from "react-native";

import { Colors, Typography } from "../variables";

export const DecklistScreenStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    maxHeight: "100%",
    minWidth: "100%",
    paddingBottom: 12,
    paddingTop: 60,
  },
  decksList: {
    minWidth: "80%",
    paddingHorizontal: 24,
    zIndex: -1,
  },
  noDecks: {
    alignSelf: "center",
    fontSize: Typography.fontSizes.lg,
  },
});
