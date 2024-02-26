import { StyleSheet } from "react-native";

import { colors } from "../utils/colors";

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
    borderWidth: 1,
    height: "auto",
    marginHorizontal: "10%",
    marginTop: 24,
    maxWidth: "80%",
    minWidth: "80%",
  },
  activeDeckName: {
    fontSize: 16,
    marginEnd: 16,
  },
  activeDeckTitle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingTop: 12,
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colors.darkBlue,
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
    flex: 1,
    maxHeight: "100%",
    minWidth: "100%",
    paddingBottom: 36,
    paddingTop: 12,
  },
  logo: {
    alignSelf: "center",
    height: 75,
    marginTop: 24,
    resizeMode: "contain",
    width: 100,
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
    paddingTop: 24,
    textAlign: "center",
  },
});
