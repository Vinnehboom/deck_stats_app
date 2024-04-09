import { ImageStyle, ViewStyle, TextStyle } from "react-native";

import { Typography, Colors, Spacing, screenHeight } from "./variables/";

const inputHeight = screenHeight / 25;

export const Inputs: { [name: string]: ImageStyle | ViewStyle | TextStyle } = {
  select: {
    height: inputHeight,
    width: "100%",
    backgroundColor: Colors.white,
  },
  input: {
    height: inputHeight,
    backgroundColor: Colors.white,
    borderColor: Colors.grey,
    borderRadius: 3,
    borderWidth: 0.4,
    marginVertical: Spacing.lg,
    fontSize: Typography.fontSizes.md,
    padding: Spacing.xs,
    minWidth: "100%",
  },
  inputLabel: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: "bold",
    marginVertical: Spacing.xs,
  },
  button: {
    elevation: 5,
    shadowColor: "rgba(0,0,0,0.6)",
    borderRadius: 10,
    shadowOffset: { height: 3, width: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 0,
  },
  buttonText: {
    color: Colors.white,
    paddingHorizontal: Spacing.xs,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
};
