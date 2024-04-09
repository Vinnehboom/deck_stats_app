import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

import { Text } from "../components/layout/Text";
import { Colors, Typography, Spacing } from "../styles/variables";

export const Spinner = ({ marginTop, height, description }: { marginTop?: number; height?: number; description?: string }) => {
  // TODO: look into React Suspense

  return (
    <View style={{ ...styles.container, marginTop: marginTop || Spacing.md }}>
      {description ? (
        <Text alignSelf="center" italic={true} marginBottom={5} fontSize={Typography.fontSizes.lg}>
          {description}
        </Text>
      ) : null}
      <ActivityIndicator style={{ height: height || 50 }} size="large" color={Colors.darkBlue} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
