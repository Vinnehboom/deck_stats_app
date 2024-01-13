import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";

import { Deck } from "../types";
import { colors } from "../utils/colors";
import { RootStackParamList } from "../types/RouteParams";

type DeckListPropTypes = {
  deck: Deck;
};

export const DeckItem = ({ deck }: DeckListPropTypes) => {
  const { push } = useNavigation<StackNavigationProp<RootStackParamList>>();

  const showPage = () => {
    push("DecklistHome", { deck: deck });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> {deck.name}</Text>
      <TouchableOpacity onPress={showPage}>
        <Text>Show</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 0.5,
    color: colors.white,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    padding: 8,
  },
  title: {
    color: colors.red,
    fontSize: 14,
  },
});
