import { StyleSheet } from "react-native";

import { colors } from "../../utils/colors";
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
    borderColor: colors["primary-dark"],
    borderRadius: 10,
    borderWidth: 30,
    flex: 1,
    justifyContent: "center",
  },
  glareSvg: { left: 5, position: "absolute", top: -215 },
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
