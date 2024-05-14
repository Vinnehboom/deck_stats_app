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
    minWidth: "100%",
    paddingVertical: Spacing.xs,
  },
  formContainer: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.sm,
  },
  logOutButton: { position: "absolute", right: "8%", top: "45%" },
  logo: {
    alignSelf: "center",
    height: screenHeight * 0.07,
    marginTop: Spacing.xl,
    resizeMode: "contain",
    width: 100,
  },
  logoContainer: { flex: 1 },
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
    fontSize: Typography.fontSizes.lg,
    marginBottom: Spacing.xxs,
    paddingTop: Spacing.xs,
    textAlign: "center",
  },
});
