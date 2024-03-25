import { StyleSheet } from "react-native";

import { colors } from "../../utils/colors";

export const MatchRecordFormStyle = StyleSheet.create({
  container: {
    marginHorizontal: "2%",
    paddingHorizontal: "4%",
    position: "relative",
    top: "-5%",
    width: "96%",
    zIndex: -1,
  },
  input: {
    backgroundColor: colors.white,
  },
  inputBox: {
    marginVertical: 2,
    position: "relative",
    zIndex: -1,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 2,
  },
  listSelect: {
    width: "100%",
  },
  submitButton: {
    alignSelf: "center",
    backgroundColor: colors.primary,
    width: "75%",
  },
  submitButtonText: {
    color: colors.white,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
