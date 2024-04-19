import { StyleSheet } from "react-native";

import { Colors } from "../variables";
import { Typography, screenWidth as width, screenHeight as height, Spacing } from "../variables";

export const DeckMatchupsStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    maxHeight: height - 6,
    minWidth: width - 6,
    padding: Spacing.xs,
  },
  highlightMatchupBlock: {
    minWidth: width * 0.67,
  },
  highlightMatchupContainer: {
    backgroundColor: Colors.light,
    marginHorizontal: Spacing.md,
    paddingBottom: 0,
    width: "90%",
  },
  highlightMatchupPercentage: {
    fontSize: Typography.fontSizes.md,
    maxWidth: "30%",
    minWidth: "15%",
    paddingTop: Spacing.sm,
    textAlign: "center",
  },
  highlightMatchupText: {
    fontSize: Typography.fontSizes.md,
    maxWidth: "15%",
    minWidth: "15%",
    paddingTop: Spacing.sm,
    textAlign: "center",
  },
  highlightMatchupTitle: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: "bold",
    minWidth: "20%",
    paddingTop: Spacing.sm,
  },
  listSelect: {
    marginBottom: Spacing.lg,
    minWidth: "100%",
  },
  listSelectTitle: {
    fontSize: Typography.fontSizes.md,
    fontWeight: "bold",
    marginLeft: Spacing.md,
    minWidth: "30%",
    paddingTop: Spacing.xxs,
  },
  matchupListEven: {
    borderBottomWidth: 2,
    borderColor: Colors.white,
    padding: Spacing.xxs,
    width: "auto",
  },
  matchupListOdd: {
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    padding: Spacing.xxs,
    width: "auto",
  },
  matchupText: {
    alignItems: "center",
    color: "rgba(0,0,0,0.8)",
    fontSize: Typography.fontSizes.lg,
    fontWeight: "500",
    minHeight: "100%",
    paddingTop: Spacing.sm,
    textAlign: "center",
    width: "20%",
  },
  noData: {
    alignSelf: "center",
    fontSize: Typography.fontSizes.xl,
    fontWeight: "bold",
  },
  scrollViewContainer: {
    height: height,
  },
});
