import { Platform, StyleSheet } from "react-native";

import { screenWidth, screenHeight } from "../dimensions";
import { colors } from "../../utils/colors";
export const LoginScreenStyle = StyleSheet.create({
  button: {
    borderRadius: 20,
    elevation: 15,
    shadowColor: "rgba(0,0,0,0.3)",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    width: "75%",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
    width: "60%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  content: {
    alignItems: "center",
    borderColor: "rgba(0,0,0, 0.3)",
    borderWidth: 5,
    flex: 1,
    justifyContent: "center",
    width: screenWidth - 60,
  },
  formContainer: {
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 10,
    elevation: 15,
    height: "auto",
    marginHorizontal: "10%",
    marginTop: screenHeight / 35,
    padding: screenHeight / 60,
    shadowColor: "rgba(0,0,0,0.3)",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    width: "80%",
  },
  formTitle: {
    alignItems: "center",
    fontFamily: "BungeeInline-Regular",
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 12,
    textAlign: "center",
  },
  input: {
    backgroundColor: "white",
    borderColor: colors.grey,
    borderRadius: Platform.OS === "ios" ? 10 : 2,
    borderWidth: 0.2,
    fontSize: 14,
    height: screenHeight / 20,
    marginTop: 5,
    marginVertical: screenHeight / 70,
    minWidth: "90%",
    padding: 5,
    paddingHorizontal: screenHeight / 70,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    zIndex: 1,
  },
  inputContainer: {
    width: "95%",
  },
  title: {
    paddingTop: screenHeight / 60,
    position: "absolute",
    top: screenHeight / 30,
  },
});
