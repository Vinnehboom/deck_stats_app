import { StyleSheet } from "react-native";

import { Colors, screenHeight as height, screenWidth as width } from "../variables";

export const ScrollableScreenStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    maxHeight: height - 6,
    minWidth: width - 6,
  },
  scrollViewContainer: {
    maxHeight: height,
    paddingBottom: 36,
    paddingTop: 8,
  },
});
