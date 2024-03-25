import { StyleSheet } from "react-native";

import { colors } from "../utils/colors";
import { screenHeight } from "./dimensions";

export const LandingScreenStyle = StyleSheet.create({
  activeDeck: {
    alignItems: "center",
    display: "flex",
    fontSize: 16,
    justifyContent: "center",
    marginVertical: 16,
  },
  activeDeckContainer: {
    borderRadius: 10,
    height: "auto",
    marginHorizontal: "10%",
    marginTop: 24,
    maxWidth: "80%",
    minWidth: "80%",
  },
  activeDeckLink: {
    color: colors["primary-dark"],
    fontSize: 16,
    fontWeight: "500",
    paddingVertical: 5,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  activeDeckName: {
    fontSize: 16,
    marginEnd: 16,
  },
  activeDeckTitle: {
    fontSize: 22,
    fontWeight: "bold",
    paddingTop: 24,
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colors.red,
    borderRadius: 10,
    marginTop: 40,
    padding: 15,
    width: "60%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
    maxHeight: screenHeight,
    minWidth: "100%",
    paddingBottom: 12,
    paddingTop: 12,
  },
  logo: {
    alignSelf: "center",
    height: 60,
    marginTop: 24,
    resizeMode: "contain",
    width: 100,
  },
  recentRecordsContainer: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  recentRecordsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 12,
  },
  setActiveDeckLink: {
    color: colors.darkBlue,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  setActiveDeckText: {
    marginVertical: 16,
    textAlign: "center",
  },
  welcome: {
    fontSize: 18,
    paddingTop: 16,
    textAlign: "center",
  },
});
