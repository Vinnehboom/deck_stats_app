import { StyleSheet } from "react-native";

import { colors } from "../../utils/colors";
export const DeckListsStyle = StyleSheet.create({
  listFormContainer: {
    backgroundColor: colors.light,
    borderRadius: 10,
    height: "auto",
    marginBottom: 40,
    marginHorizontal: "10%",
    minWidth: "80%",
  },
  listsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 24,
    textAlign: "center",
  },
});
