import { StyleSheet } from "react-native";

import { screenWidth } from "../dimensions";
import { colors } from "../../utils/colors";
export const LoginScreenStyle = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.darkBlue,
    borderRadius: 10,
    padding: 15,
    width: "100%",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    width: "60%",
  },
  buttonOutline: {
    backgroundColor: "white",
    borderColor: colors.darkBlue,
    borderWidth: 2,
    marginTop: 5,
  },
  buttonOutlineText: {
    color: colors.darkBlue,
    fontSize: 16,
    fontWeight: "700",
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
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  inputContainer: {
    width: "80%",
  },
  title: {
    paddingTop: 20,
    position: "relative",
    top: -160,
  },
});
