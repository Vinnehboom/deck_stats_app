import { StyleSheet } from "react-native";

import { colors } from "../../utils/colors";

export const DeckDetailsStyle = StyleSheet.create({
  formTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 20, textAlign: "center" },
  historyTitle: { fontSize: 20, fontWeight: "bold", marginVertical: 12, textAlign: "center" },
  matchRecordFormContainer: {
    backgroundColor: colors.light,
    borderRadius: 10,
    height: "auto",
    marginBottom: 40,
    marginHorizontal: "10%",
    minWidth: "80%",
  },
  optionButton: { borderRadius: 5, height: "100%" },
  optionButtonText: { color: colors.white, fontWeight: "bold" },
  optionsContainer: {
    alignSelf: "center",
    justifyContent: "space-around",
    marginVertical: 12,
    paddingBottom: 16,
    width: "75%",
  },
  optionsTitle: { fontSize: 20, fontWeight: "bold", marginVertical: 2, textAlign: "center" },
});
