import { StyleSheet } from "react-native";

import { colors } from "../../utils/colors";
import { screenHeight, screenWidth } from "../dimensions";

export const ListFormStyle = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 10,
    marginTop: 20,
    padding: 10,
    width: "auto",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
  formField: {
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 0,
    fontSize: 14,
  },
  listForm: {
    alignItems: "center",
    minWidth: screenWidth - screenWidth / 10,
    paddingHorizontal: screenWidth / 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginVertical: screenHeight / 30,
    textAlign: "center",
  },
});
