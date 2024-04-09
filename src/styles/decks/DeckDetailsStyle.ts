import { StyleSheet } from "react-native";

import { Colors, Spacing } from "../variables";

export const DeckDetailsStyle = StyleSheet.create({
  optionButton: { borderRadius: 5, height: "100%" },
  optionButtonText: { color: Colors.white, fontWeight: "bold" },
  optionsContainer: {
    alignSelf: "center",
    justifyContent: "space-around",
    paddingBottom: Spacing.md,
    width: "75%",
  },
});
