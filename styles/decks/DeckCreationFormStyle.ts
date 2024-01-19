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
      borderRadius: 5,
      fontSize: 14,
      height: "18%",
      minWidth: "75%",
    },
    selectContainer: {
      position: "absolute" as const,
      borderBottomRightRadius: 5,
      borderBottomLeftRadius: 5,
      top: "63%",
      height: "60%",
      minWidth: "50%",
      width: "75%",
      backgroundColor: colors.light,
      zIndex: 999,
    },
    selectField: {
      backgroundColor: "white",
      paddingHorizontal: 5,
      paddingVertical: 2,
      marginVertical: 10,
      borderRadius: 5,
      fontSize: 14,
      height: "70%",
      minWidth: "75%",
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
