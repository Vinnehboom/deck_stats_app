import { TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import firestore from "@react-native-firebase/firestore";
import { showMessage } from "react-native-flash-message";
import { VStack, Text } from "native-base";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { DeckCreationFormStyle } from "../../styles/decks/DeckCreationFormStyle";
import { Deck, User, ArchetypeBase } from "../../types";
import { ArchetypeSelect } from "../archetypes/ArchetypeSelect";

type DeckCreationFormPropsType = {
  user: User | null;
};

export const DeckCreationForm = ({ user }: DeckCreationFormPropsType) => {
  const [deckName, setDeckName] = useState<string>("");
  const queryClient = useQueryClient();
  const [deckArchetype, setDeckArchetype] = useState<ArchetypeBase>();

  const createDeckMutation = useMutation({
    mutationFn: async (deck: Deck) => {
      firestore().collection("Decks").doc(deck.id).set(deck);
    },
    onSuccess: () => {
      showMessage({
        message: "Deck added!",
        type: "info",
      });
      queryClient.invalidateQueries({ queryKey: ["Decks"] });
      setDeckName("");
      setDeckArchetype(undefined);
    },
  });

  const handleDeckCreation = () => {
    if (deckName.length > 0 && deckArchetype) {
      const myuuid = uuidv4();
      const deck: Deck = {
        id: myuuid,
        name: deckName,
        userId: user!.uid,
        archetype: deckArchetype,
      };
      createDeckMutation.mutate(deck);
    } else {
      showMessage({
        message: "Please add a deck name",
        type: "warning",
      });
    }
  };

  return (
    <VStack paddingTop={10}>
      <Text style={DeckCreationFormStyle.formTitle}>Add decklist</Text>
      <View style={DeckCreationFormStyle.deckForm}>
        <TextInput
          placeholder="Deck title"
          value={deckName}
          onChangeText={text => setDeckName(text)}
          style={DeckCreationFormStyle.deckForm.formField}
        />
        <ArchetypeSelect setDeckArchetype={setDeckArchetype} selectedArchetype={deckArchetype} />
        <TouchableOpacity onPress={handleDeckCreation} style={DeckCreationFormStyle.button}>
          <Text style={DeckCreationFormStyle.buttonText}> Add deck </Text>
        </TouchableOpacity>
      </View>
    </VStack>
  );
};
