import { StyleSheet } from "react-native";

import { Typography, Colors, Spacing, screenHeight } from "./variables";

export const LandingScreenStyle = StyleSheet.create({
  activeDeck: {
    alignItems: "center",
    display: "flex",
    fontSize: Typography.fontSizes.md,
    justifyContent: "center",
    marginTop: Spacing.sm,
  },

  activeDeckName: {
    fontSize: Typography.fontSizes.lg,
    marginEnd: Spacing.lg,
  },
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    maxHeight: screenHeight,
    minWidth: "100%",
    paddingVertical: Spacing.xs,
  },
  formContainer: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.sm,
  },
  logo: {
    alignSelf: "center",
    height: screenHeight * 0.08,
    marginTop: Spacing.xl,
    resizeMode: "contain",
    width: 100,
  },
  recentRecordsContainer: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  setActiveDeckLink: {
    color: Colors.darkBlue,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  setActiveDeckText: {
    marginVertical: Spacing.md,
    textAlign: "center",
  },
  welcome: {
    fontSize: Typography.fontSizes.xl,
    marginBottom: Spacing.xs,
    paddingTop: Spacing.xs,
    textAlign: "center",
  },
});
