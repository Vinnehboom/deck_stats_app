import { StyleSheet } from "react-native";

import { Colors, Spacing, Typography, screenHeight } from "../variables";

export const ArchetypeSelectStyle = StyleSheet.create({
  selectContainer: {
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    elevation: 50,
    height: "auto",
    maxHeight: screenHeight / 6.5,
    minWidth: "100%",
    position: "absolute",
    shadowColor: Colors["primary-dark"],
    shadowOffset: { height: 3, width: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 0,
    top: screenHeight / 20,
    width: "100%",
    zIndex: 9999,
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
  selectItem: {
    borderBottomWidth: 0.2,
    display: "flex",
    justifyContent: "center",
    marginHorizontal: Spacing.xs,
    minWidth: "75%",
    padding: Spacing.sm,
    zIndex: 9999,
  },
  selectLink: { display: "flex", width: "100%" },
});
