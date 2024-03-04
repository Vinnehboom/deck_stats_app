import { StyleSheet } from "react-native";

import { screenWidth as width, screenHeight as height } from "../dimensions";

export const DeckListsStyle = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: height - 6,
    minWidth: width - 6,
  },
  scrollViewContainer: {
    maxHeight: height,
  },
});
