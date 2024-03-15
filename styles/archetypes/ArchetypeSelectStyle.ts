import { StyleSheet } from "react-native";

import { colors } from "../../utils/colors";
import { screenHeight } from "../dimensions";

export const ArchetypeSelectStyle = StyleSheet.create({
  selectContainer: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    elevation: 50,
    height: screenHeight / 10,
    minWidth: "100%",
    position: "absolute",
    top: screenHeight / 20,
    width: "100%",
    zIndex: 2,
  },
  selectField: {
    backgroundColor: "white",
    borderColor: colors.grey,
    borderRadius: 3,
    borderWidth: 0.2,
    fontSize: 14,
    height: screenHeight / 30,
    marginVertical: 10,
    minWidth: "100%",
    paddingHorizontal: 5,
    paddingVertical: 2,
    position: "relative",
  },
});
