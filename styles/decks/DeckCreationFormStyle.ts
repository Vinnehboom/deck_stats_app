import { StyleSheet } from "react-native";

import { colors } from "../../utils/colors";

export const DeckCreationFormStyle = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.darkBlue,
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
    width: "auto",
    zIndex: -1,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
  deckForm: {
    alignItems: "center",
    flex: 1,
    formField: {
      backgroundColor: "white",
      paddingHorizontal: 5,
      paddingVertical: 2,
      marginVertical: 10,
      borderColor: colors.grey,
      borderRadius: 3,
      borderWidth: 0.2,
      fontSize: 14,
      height: "18%",
      minWidth: "82%",
    },
    selectOption: {
      borderBottom: 2,
    },
    width: "100%",
  },
  formTitle: {
    fontSize: 18,
    paddingVertical: 4,
    textAlign: "center",
  },
  subTitle: {
    fontSize: 18,
    marginTop: "10%",
    paddingVertical: 4,
    textAlign: "center",
  },
});
