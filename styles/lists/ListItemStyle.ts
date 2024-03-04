import { StyleSheet } from "react-native";

import { screenWidth, screenHeight as height } from "../dimensions";
import { colors } from "../../utils/colors";
const width = screenWidth - 2 * (screenWidth / 20);

export const ListItemStyle = StyleSheet.create({
  activateButton: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 10,
    width: "auto",
  },
  activateButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
  activeTabButton: {
    backgroundColor: colors.light,
    borderBottomEndRadius: 0,
    borderBottomLeftRadius: 0,
    borderColor: colors.light,
    justifyContent: "center",
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  activeTabButtonText: {
    color: colors.dark,
    fontSize: 14,
    fontWeight: "bold",
    textShadowColor: colors.dark,
    textShadowOffset: { width: 0, height: 2 },
  },
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
  cardImage: {
    height: "auto",
    width: width / 5,
  },
  container: {
    backgroundColor: colors.light,
    borderRadius: 10,
    elevation: 10,
    flex: 1,
    minWidth: width,
    paddingBottom: height / 40,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  header: {
    display: "flex",
    justifyContent: "space-evenly",
    padding: 12,
  },
  imageContainer: {
    alignSelf: "center",
    height: "auto",
  },
  inactiveTabButton: {
    backgroundColor: colors["primary-dark"],
    borderBottomEndRadius: 0,
    borderBottomLeftRadius: 0,
    justifyContent: "center",
  },
  inactiveTabButtonText: {
    color: colors.white,
    fontSize: 14,
  },
  item: {
    height: "auto",
    justifyContent: "center",
    paddingBottom: 5,
    width,
  },
  listLine: {
    fontSize: 14,
    marginVertical: 1.5,
    width,
  },
  listLineCount: {
    paddingStart: width / 20,
    width: width / 5,
  },
  listLineName: {
    width: 3 * (width / 5),
  },
  listLineSet: {
    width: width / 5,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  titleActionBox: {
    margin: 0,
    padding: 0,
    width: "33%",
  },
  titleBox: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    width: "33%",
  },
  titlePaddingBox: {
    width: "33%",
  },
});
