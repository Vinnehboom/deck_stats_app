import React from "react";
import { Text, Alert } from "react-native";
import { Container, Button } from "native-base";
import { RouteProp, useRoute } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/core";

import { DeckListTabParamsType, MainTabParamList } from "../../../types/RouteParams";
import { useDeckDeletion } from "../../../components/lists/_queries/useDeckDeletion";

export const DeckDetails = () => {
  const { params } = useRoute<RouteProp<DeckListTabParamsType, "Params">>();
  const { deck } = params;
  const { navigate } = useNavigation<MainTabParamList>();

  const deletionMutation = useDeckDeletion(deck, () => {
    navigate("Decks", undefined);
    showMessage({
      message: "Deck deleted!",
      type: "info",
    });
  });

  const handleDeckDeletion = () => {
    Alert.alert("Confirm deletion", "Are you sure you want to delete this deck?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      { text: "Confirm", onPress: deletionMutation.mutate },
    ]);
  };

  return (
    <Container minWidth="100%" safeAreaTop flex={1} justifyContent="center" alignItems="center">
      <Text>{deck.name}</Text>
      <Button mt={3} colorScheme="danger" onPress={handleDeckDeletion}>
        <Text>Delete {deck.name}</Text>
      </Button>
    </Container>
  );
};
