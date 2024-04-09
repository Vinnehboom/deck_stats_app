import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

import { Colors } from "../variables";
const { height: screenHeight } = Dimensions.get("screen");
const { height: windowHeight } = Dimensions.get("window");
const glareTop = screenHeight - windowHeight !== 0 ? -(screenHeight / 4) : -(screenHeight / 3.5);
export const LoginScreenContainerStyle = StyleSheet.create({
  buttonImage: {
    height: 30,
    position: "absolute",
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    width: 70,
  },
  buttonLeft: {
    bottom: -40,
    left: 85,
  },
  buttonRight: {
    bottom: -40,
    right: 85,
  },
  container: {
    alignItems: "center",
    backgroundColor: "#D4D4D4",
    borderBottomWidth: 60,
    borderColor: Colors["primary-dark"],
    borderWidth: 30,
    flex: 1,
    justifyContent: "center",
  },
  glareSvg: { left: 5, position: "absolute", top: glareTop + screenHeight / 30 },
  screwImage: { height: 15, position: "absolute", width: 15 },
  screwImageLeft: { right: -18, top: -15 },
  screwImageRight: { left: -15, top: -15 },
  speakerImage: { height: 25, position: "absolute", width: 30 },
  speakerImageLeft1: {
    bottom: -36,
    left: 10,
  },
  speakerImageLeft2: { bottom: -36, left: 35 },
  speakerImageRight1: {
    bottom: -36,
    right: 10,
  },
  speakerImageRight2: { bottom: -36, right: 35 },
});
