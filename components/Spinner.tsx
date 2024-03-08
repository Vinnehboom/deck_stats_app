import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

import { colors } from "../utils/colors";

export const Spinner = ({ marginTop, height }: { marginTop?: number; height?: number }) => {
  return (
    <View style={{ ...styles.container, marginTop: marginTop || 12 }}>
      <ActivityIndicator style={{ height: height || 50 }} size="large" color={colors.darkBlue} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
