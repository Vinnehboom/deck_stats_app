import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { HStack } from "native-base";
import { useTranslation } from "react-i18next";

import { Text } from "../components/layout/Text";
import { Deck } from "../types";
import { RootStackParamList } from "../types/RouteParams";
import { ArchetypeIcons } from "./decks/ArchetypeIcons";
import { DeckItemStyle } from "../styles/decks/DeckItemStyle";

type DeckListPropTypes = {
  deck: Deck;
};

export const DeckItem = ({ deck }: DeckListPropTypes) => {
  const { push } = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();

  const showPage = () => {
    push("DecklistHome", { deckId: deck.id });
  };

  return (
    <View style={DeckItemStyle.container}>
      <HStack paddingX={3} flexDirection="row" width="full" justifyContent="space-between" space={4}>
        <HStack flexDirection="row">
          <HStack display="flex" justifyContent="flex-end" minWidth="30%">
            <ArchetypeIcons archetype={deck?.archetype} />
          </HStack>
          <Text style={DeckItemStyle.deckName}>{deck.name}</Text>
        </HStack>
        <TouchableOpacity onPress={showPage}>
          <Text style={DeckItemStyle.showLink}>{t("DECK.LIST_ITEM.SHOW")}</Text>
        </TouchableOpacity>
      </HStack>
    </View>
  );
};
