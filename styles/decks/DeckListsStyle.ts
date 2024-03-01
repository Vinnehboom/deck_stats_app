import { StyleSheet } from "react-native";

import { colors } from "../../utils/colors";

export const DeckListsStyle = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.darkBlue,
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
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    minWidth: "100%",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  formField: {
    backgroundColor: "white",
    borderRadius: 5,
    fontSize: 16,
    height: "80%",
    minWidth: "100%",
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  listForm: {
    alignItems: "center",

    marginBottom: -50,
    minHeight: "45%",
    minWidth: "100%",
  },
  listsContainer: { width: "80%" },
  scrollContainer: { flexShrink: 1 },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginVertical: 5,
    textAlign: "center",
  },
});
