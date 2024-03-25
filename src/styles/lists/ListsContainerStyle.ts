import { StyleSheet } from "react-native";

import { screenWidth as width, screenHeight as height } from "../dimensions";

export const ListContainerStyle = StyleSheet.create({
  listsContainer: {
    alignItems: "stretch",
    gap: width / 10,
    justifyContent: "center",
    marginTop: height / 40,
    minWidth: width,
    paddingBottom: height / 40,
    paddingHorizontal: width / 30,
  },
});
