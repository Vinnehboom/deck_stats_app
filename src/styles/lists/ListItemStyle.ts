import { StyleSheet } from "react-native";

import { Colors, Spacing, Typography, screenWidth, screenHeight as height } from "../variables";
const width = screenWidth - 2 * (screenWidth / 20);

export const ListItemStyle = StyleSheet.create({
  activateButton: {
    alignItems: "center",
    backgroundColor: Colors.primary,
    borderRadius: 10,
    padding: Spacing.lg,
    width: "100%",
  },
  activateButtonText: {
    color: "white",
    fontSize: Typography.fontSizes.md,
    fontWeight: "700",
  },
  activeTabButton: {
    backgroundColor: Colors.light,
    borderBottomEndRadius: 0,
    borderBottomLeftRadius: 0,
    borderColor: Colors.light,
    justifyContent: "center",
    shadowColor: Colors.dark,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  activeTabButtonText: {
    color: Colors.dark,
    fontSize: Typography.fontSizes.md,
    fontWeight: "bold",
    textShadowColor: Colors.dark,
    textShadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    color: "white",
    fontSize: Typography.fontSizes.md,
    fontWeight: "700",
  },
  cardImage: {
    height: "auto",
    width: width / 5,
  },
  container: {
    backgroundColor: Colors.light,
    borderRadius: 10,
    elevation: 10,
    flex: 1,
    minWidth: width,
    paddingBottom: Spacing.lg,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  countCircle: {
    backgroundColor: Colors["primary-dark"],
    bottom: height / 60,
    height: height / 40,
    position: "absolute",
    width: height / 40,
    zIndex: 1,
  },
  countCircleCount: {
    color: Colors.white,
    fontSize: Typography.fontSizes.md,
  },
  deleteIcon: { marginEnd: Spacing.sm, marginStart: "auto" },
  header: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-evenly",
    padding: Spacing.sm,
  },
  imageContainer: {
    alignSelf: "center",
    height: "auto",
  },
  inactiveTabButton: {
    backgroundColor: Colors["primary-dark"],
    borderBottomEndRadius: 0,
    borderBottomLeftRadius: 0,
    justifyContent: "center",
  },
  inactiveTabButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSizes.md,
  },
  item: {
    height: "auto",
    justifyContent: "center",
    paddingBottom: Spacing.xs,
    width,
  },
  listLine: {
    fontSize: Typography.fontSizes.md,
    marginVertical: Spacing.xxs,
    width,
  },
  listLineCount: {
    paddingStart: Spacing.md,
    width: width / 5,
  },
  listLineName: {
    width: 3 * (width / 5),
  },
  listLineSet: {
    width: width / 5,
  },

  title: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: "bold",
  },
  titleActionBox: {
    margin: 0,
    padding: 0,
    width: "30%",
  },
  titleBox: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    width: "50%",
  },
  titlePaddingBox: {
    alignItems: "flex-end",
    width: "20%",
  },
});
