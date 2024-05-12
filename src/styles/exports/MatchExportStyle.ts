import { StyleSheet } from "react-native";

import { Colors, Spacing, Typography, screenWidth as width, screenHeight as height } from "../variables";

export const MatchExportStyle = StyleSheet.create({
  coinflip: {
    alignSelf: "center",
    height: 30,
    resizeMode: "contain",
    width: 30,
  },
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    minWidth: width - 6,
    paddingBottom: Spacing.xxl,
  },
  header: {
    marginVertical: Spacing.xxs,
  },
  imageContainer: {
    backgroundColor: Colors.white,
    paddingBottom: Spacing.xl,
  },
  logo: {
    alignSelf: "center",
    height: height * 0.08,
    marginTop: Spacing.xs,
    resizeMode: "contain",
    width: 100,
  },
  loss: {
    backgroundColor: Colors.lightRed,
    color: Colors.red,
  },
  matchupContainer: {
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    padding: Spacing.xs,
  },
  number: {
    fontSize: Typography.fontSizes.xxl,
    fontWeight: "bold",
    paddingTop: Spacing.sm,
  },
  opponentArchetype: {
    paddingLeft: Spacing.md,
  },
  result: {
    fontSize: Typography.fontSizes.xxl,
    fontWeight: "bold",
    paddingLeft: Spacing.sm,
  },
  roundNumber: { fontSize: Typography.fontSizes.xxl, fontWeight: "bold" },
  score: {
    fontSize: Typography.fontSizes.xl,
    marginLeft: "auto",
    paddingLeft: Spacing.md,
  },
  tie: {
    backgroundColor: Colors.yellow,
    color: Colors.orange,
  },
  waterMark: {
    alignSelf: "center",
    color: Colors.dark,
    fontStyle: "italic",
    marginBottom: Spacing.xxs,
  },
  win: {
    backgroundColor: Colors.lightGreen,
    color: Colors.green,
  },
});
