import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { Flex, Image, Text, HStack } from "native-base";

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
      <Flex flexDirection="row" width="80%" justifyContent="space-between">
        <Text marginY={1} marginRight={2} fontSize="md">
          {deck.name}
        </Text>
        <HStack flexDirection="row" marginTop={1}>
          {deck.archetype?.icons?.length &&
            deck.archetype.icons.map((icon, index) => (
              <Image
                marginRight={2}
                key={icon + index}
                source={{
                  uri: `https://limitlesstcg.s3.us-east-2.amazonaws.com/pokemon/gen9/${icon}.png`,
                }}
                minHeight="100%"
                resizeMode="stretch"
                alt={icon}
                size="2xs"
              />
            ))}
        </HStack>
      </Flex>
      <TouchableOpacity onPress={showPage}>
        <Text marginTop={1}>Show</Text>
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
});
