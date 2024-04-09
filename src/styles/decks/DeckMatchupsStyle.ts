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
    width: width * 0.655,
  },
  highlightMatchupContainer: {
    backgroundColor: Colors.light,
    marginHorizontal: Spacing.md,
    paddingBottom: 0,
    width: "90%",
  },
  highlightMatchupTitle: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: "bold",
    paddingHorizontal: Spacing.sm,
    width: width * 0.2,
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
    borderColor: Colors.light,
    paddingHorizontal: Spacing.xxs,
  },
  matchupListOdd: {
    backgroundColor: Colors.white,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,

    paddingHorizontal: Spacing.xxs,
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
    maxHeight: height,
  },
});
