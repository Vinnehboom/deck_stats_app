import React from "react";
import { Text, View, StyleSheet } from "react-native";

import { colors } from "../utils/colors";

export const Header = () => {
  return (
    <View style={styles.background}>
      <Text style={styles.title}>Deck Stats TCG</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.darkBlue,
    padding: 24,
  },
  title: {
    color: colors.white,
    fontSize: 32,
    textAlign: "center",
  },
});
