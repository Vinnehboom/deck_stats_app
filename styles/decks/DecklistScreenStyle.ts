import { StyleSheet } from "react-native";

import { colors } from "../../utils/colors";

export const DecklistScreenStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    maxHeight: "100%",
    minWidth: "100%",
    paddingBottom: 12,
    paddingTop: 12,
  },
  decksList: {
    minWidth: "80%",
    paddingHorizontal: 24,
    zIndex: -1,
  },
  subTitle: {
    fontSize: 22,
    marginVertical: 20,
    textAlign: "center",
    zIndex: -1,
  },
  title: {
    fontSize: 24,
    paddingTop: 60,
    textAlign: "center",
    zIndex: -1,
  },
});
