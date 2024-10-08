import { StyleSheet } from "react-native";

import { Colors, screenWidth as width, screenHeight as height, Spacing } from "../variables";

export const MatchupNotesStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    maxHeight: height - 6,
    minWidth: width - 6,
  },
  header: {
    marginVertical: Spacing.md,
  },
  noteContainer: {
    borderBottomColor: Colors["primary-dark"],
    borderBottomWidth: 1,
    marginHorizontal: Spacing.sm,
    paddingBottom: Spacing.xs,
    padding: Spacing.xxs,
  },
  remarks: { marginBottom: Spacing.md, marginLeft: Spacing.md, maxWidth: "70%", paddingTop: Spacing.xxs, textAlign: "justify" },
  starIcon: { marginStart: "auto", paddingTop: Spacing.md },
  trashIcon: { marginStart: "auto", paddingTop: Spacing.xs },
});
