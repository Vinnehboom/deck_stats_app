import { StyleSheet } from "react-native";

import { Colors, Spacing, Typography, screenHeight } from "../variables";

export const ArchetypeSelectStyle = StyleSheet.create({
  selectContainer: {
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    elevation: 50,
    height: "auto",
    maxHeight: screenHeight / 5,
    minWidth: "100%",
    position: "absolute",
    top: screenHeight / 20,
    width: "100%",
    zIndex: 2,
  },
  selectField: {
    borderColor: Colors.grey,
    borderEndWidth: 1,
    borderRadius: 3,
    borderWidth: 0.2,
    fontSize: Typography.fontSizes.md,
    height: screenHeight / 25,
    marginVertical: Spacing.xs,
    minWidth: "100%",
    paddingHorizontal: 5,
    paddingVertical: Spacing.xxs,
    position: "relative",
  },
});
