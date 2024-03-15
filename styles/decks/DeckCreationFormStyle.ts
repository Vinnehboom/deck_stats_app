import { StyleSheet } from "react-native";

import { colors } from "../../utils/colors";
import { screenHeight } from "../dimensions";

export const DeckCreationFormStyle = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.primary,
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
    textTransform: "uppercase",
  },
  container: {
    borderRadius: 10,
    marginHorizontal: "10%",
    marginTop: 24,
    maxHeight: screenHeight / 3,
    maxWidth: "80%",
    minHeight: screenHeight / 4,
    minWidth: "80%",
  },
  deckForm: {
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
  deckformField: {
    backgroundColor: "white",
    borderColor: colors.grey,
    borderRadius: 3,
    borderWidth: 0.2,
    fontSize: 14,
    marginVertical: 10,
    minWidth: "82%",
    padding: 5,
  },
  deckselectOption: {
    borderBottomWidth: 2,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "bold",
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
