import { StyleSheet } from "react-native";

import { colors } from "../../utils/colors";
import { screenWidth as width, screenHeight as height } from "../dimensions";

export const MatchupNotesStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    maxHeight: height - 6,
    minWidth: width - 6,
  },
  header: {
    marginVertical: height / 40,
  },
  noteContainer: {
    borderBottomColor: colors["primary-dark"],
    borderBottomWidth: 1,
    marginHorizontal: 12,
    paddingBottom: 12,
    padding: 10,
  },
  scrollViewContainer: {
    maxHeight: height,
  },
});
