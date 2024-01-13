import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

import { colors } from "../utils/colors";

export const Spinner = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator style={styles.spinner} size="large" color={colors.darkBlue} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  spinner: {},
});
