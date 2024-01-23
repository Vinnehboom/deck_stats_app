import React from "react";
import { Text, Alert } from "react-native";
import { Container, Button } from "native-base";
import { RouteProp, useRoute } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { DeckListTabParamsType, MainTabParamList } from "../../../types/RouteParams";

export const DecklistDetails = () => {
  const { params } = useRoute<RouteProp<DeckListTabParamsType, "Params">>();
  const { deck } = params;
  const { navigate } = useNavigation<MainTabParamList>();
  const queryClient = useQueryClient();

  const deletionMutation = useMutation({
    mutationFn: async () => {
      firestore()
        .collection("Decks")
        .doc(deck.id)
        .delete()
        .then(() => {
          navigate("Decks", undefined);
        });
    },
    onSuccess: () => {
      showMessage({
        message: "Deck deleted!",
        type: "info",
      });
      queryClient.invalidateQueries({ queryKey: ["Decks"] });
    },
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
