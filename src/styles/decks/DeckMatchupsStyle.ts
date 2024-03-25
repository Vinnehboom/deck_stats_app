import { StyleSheet } from "react-native";

import { colors } from "../../utils/colors";
import { screenWidth as width, screenHeight as height } from "../dimensions";

export const DeckMatchupsStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    maxHeight: height - 6,
    minWidth: width - 6,
  },
  highlightMatchupBlock: {
    width: width * 0.6,
  },
  highlightMatchupTitle: { fontSize: 16, fontWeight: "bold", paddingHorizontal: 8, width: width * 0.4 },
  listSelect: {
    marginBottom: 24,
    marginHorizontal: "2%",
    minWidth: "100%",
  },
  listSelectTitle: {
    fontSize: 14,
    fontWeight: "bold",
    minWidth: "30%",
    paddingTop: 3,
    textAlign: "center",
  },
  matchupContainer: {
    padding: 12,
  },
  matchupListEven: {
    borderColor: colors.light,
    paddingHorizontal: 4,
  },
  matchupListOdd: {
    backgroundColor: colors.white,
    paddingHorizontal: 4,
  },
  matchupText: {
    alignItems: "center",
    color: "rgba(0,0,0,0.8)",
    fontSize: 16,
    fontWeight: "500",
    minHeight: "100%",
    paddingTop: 12,
    textAlign: "center",
    width: "20%",
  },
  matchupsTitle: { fontSize: 22, fontWeight: "600", marginVertical: height / 30, paddingTop: 6, textAlign: "center" },
  noData: {
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollViewContainer: {
    maxHeight: height,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginVertical: height / 40,
    paddingTop: 12,
    textAlign: "center",
  },
});
