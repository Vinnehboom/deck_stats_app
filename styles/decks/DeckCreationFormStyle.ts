import { StyleSheet } from "react-native";

import { colors } from "../../utils/colors";

export const DeckCreationFormStyle = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.darkBlue,
    borderRadius: 10,
    padding: 10,
    width: "auto",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
  deckForm: {
    alignItems: "center",
    flexDirection: "row",
    formField: {
      backgroundColor: "white",
      paddingHorizontal: 5,
      paddingVertical: 5,
      borderRadius: 5,
      fontSize: 14,
      height: "100%",
      marginRight: "5%",
      width: "50%",
    },
    width: "100%",
  },
  subTitle: {
    fontSize: 18,
    paddingVertical: 24,
    textAlign: "center",
  },
});
