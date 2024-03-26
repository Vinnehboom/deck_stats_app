import { StyleSheet } from "react-native";

import { colors } from "../../utils/colors";
import { screenWidth } from "../dimensions";

export const ListFormStyle = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors["primary-dark"],
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
    backgroundColor: colors.light,
    borderRadius: 5,
    borderWidth: 0,
    fontSize: 14,
  },
  inputLabel: {
    color: colors["primary-dark"],
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 12,
  },
  limitlessLink: { color: colors["primary-dark"], fontSize: 14, fontStyle: "italic", marginTop: 12 },
  limitlessLinkIcon: { color: colors["primary-dark"], fontSize: 14, fontStyle: "italic", marginTop: 18 },

  listForm: {
    alignItems: "center",
    minWidth: screenWidth - screenWidth / 10,
    paddingHorizontal: screenWidth / 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: "5%",
    textAlign: "center",
  },
});
