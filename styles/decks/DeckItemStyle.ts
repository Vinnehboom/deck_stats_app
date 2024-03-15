import { StyleSheet } from "react-native";

import { colors } from "../../utils/colors";

export const DeckItemStyle = StyleSheet.create({
  container: {
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    padding: 2,
  },
  deckName: {
    alignItems: "center",
    fontSize: 18,
    paddingLeft: 15,
    paddingTop: "3%",
  },
  showLink: {
    color: colors["primary-dark"],
    fontSize: 16,
    paddingLeft: 15,
    paddingTop: "3%",
    textDecorationLine: "underline",
  },
});
