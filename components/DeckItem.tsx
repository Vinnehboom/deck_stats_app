import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { Flex, Text, HStack } from "native-base";
import { useTranslation } from "react-i18next";

import { Deck } from "../types";
import { colors } from "../utils/colors";
import { RootStackParamList } from "../types/RouteParams";
import { ArchetypeIcons } from "./decks/ArchetypeIcons";

type DeckListPropTypes = {
  deck: Deck;
};

export const DeckItem = ({ deck }: DeckListPropTypes) => {
  const { push } = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();

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
          <ArchetypeIcons deck={deck} />
        </HStack>
      </Flex>
      <TouchableOpacity onPress={showPage}>
        <Text marginTop={1}>{t("DECK.LIST_ITEM.SHOW")}</Text>
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
