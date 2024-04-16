import { StyleSheet } from "react-native";

import { Colors, Spacing } from "../variables";

export const DeckDetailsStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  historyContainer: {
    backgroundColor: Colors.light,
    borderColor: "#000000",
    paddingTop: Spacing.sm,
    shadowColor: Colors["primary-dark"],
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    width: "100%",
  },
  historyContainerWrapper: {
    backgroundColor: Colors.light,
    width: "100%",
  },
  optionButton: { borderRadius: 5, height: "100%" },
  optionButtonText: { color: Colors.white, fontWeight: "bold" },
  optionsContainer: {
    alignSelf: "center",
    justifyContent: "space-around",
    paddingBottom: Spacing.md,
    width: "75%",
  },
});
