import { StyleSheet } from "react-native";

import { colors } from "../../utils/colors";
import { screenHeight as height, screenWidth as width } from "../dimensions";

export const ScrollableScreenStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    maxHeight: height - 6,
    minWidth: width - 6,
  },
  scrollViewContainer: {
    maxHeight: height,
    paddingBottom: 36,
    paddingVertical: 16,
  },
});
