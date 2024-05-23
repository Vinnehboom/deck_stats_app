import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { HStack } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import { Text } from "../components/layout/Text";
import { Deck } from "../types";
import { RootStackParamList } from "../types/RouteParams";
import { ArchetypeIcons } from "./decks/ArchetypeIcons";
import { DeckItemStyle } from "../styles/decks/DeckItemStyle";
import { Colors } from "../styles/variables";

type DeckListPropTypes = {
  deck: Deck;
};

const EyeIcon = () => {
  return <FontAwesomeIcon style={DeckItemStyle.showLink} color={Colors.light} icon={faEye} />;
};

export const DeckItem = ({ deck }: DeckListPropTypes) => {
  const { push } = useNavigation<StackNavigationProp<RootStackParamList>>();

  const showPage = () => {
    push("DecklistHome", { deckId: deck.id });
  };

  return (
    <View style={DeckItemStyle.container}>
      <TouchableOpacity onPress={showPage}>
        <HStack
          paddingX={3}
          flexDirection="row"
          width="full"
          alignItems="center"
          maxW="100%"
          justifyContent="space-between"
          space={13}>
          <HStack alignItems="center" flexDirection="row">
            <HStack display="flex" justifyContent="center" minWidth="30%">
              <ArchetypeIcons archetype={deck?.archetype} />
            </HStack>
            <Text width="55%" style={DeckItemStyle.deckName}>
              {deck.name}
            </Text>
          </HStack>
          <EyeIcon />
        </HStack>
      </TouchableOpacity>
    </View>
  );
};
