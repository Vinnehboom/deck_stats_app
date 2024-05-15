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
    padding: Spacing.xs,
  },
  remarks: { marginLeft: Spacing.md, maxWidth: "75%", paddingTop: Spacing.xxs, textAlign: "justify" },
  starIcon: { marginStart: "auto" },
});
