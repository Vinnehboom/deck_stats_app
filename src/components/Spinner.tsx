import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

import { Text } from "../components/layout/Text";
import { colors } from "../utils/colors";

export const Spinner = ({ marginTop, height, description }: { marginTop?: number; height?: number; description?: string }) => {
  // TODO: look into React Suspense

  return (
    <View style={{ ...styles.container, marginTop: marginTop || 12 }}>
      {description ? (
        <Text alignSelf="center" italic={true} marginBottom={5} fontSize={16}>
          {description}
        </Text>
      ) : null}
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
