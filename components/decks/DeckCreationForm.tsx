import { Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import firestore from "@react-native-firebase/firestore";
import { showMessage } from "react-native-flash-message";

import { Deck, User } from "../../types";
import { DeckCreationFormStyle } from "../../styles/decks/DeckCreationFormStyle";

type DeckCreationFormPropsType = {
  setCreatedDecks: (value: Deck[] | undefined) => void;
  user: User | null;
};

export const DeckCreationForm = ({ setCreatedDecks, user }: DeckCreationFormPropsType) => {
  const [deckName, setDeckName] = useState<string>("");
  const handleDeckCreation = () => {
    if (deckName.length > 0) {
      const myuuid = uuidv4();
      const deck: Deck = {
        id: myuuid,
        name: deckName,
        userId: user!.uid,
      };
      firestore()
        .collection("Decks")
        .add(deck)
        .then(() => {
          showMessage({
            message: "Deck added!",
            type: "info",
          });
          setCreatedDecks([deck]);
          setDeckName("");
        });
    } else {
      showMessage({
        message: "Please add a deck name",
        type: "warning",
      });
    }
  };

  return (
    <View>
      <Text style={DeckCreationFormStyle.subTitle}>Add decklist</Text>
      <View style={DeckCreationFormStyle.deckForm}>
        <TextInput
          placeholder="Deck title"
          value={deckName}
          onChangeText={text => setDeckName(text)}
          style={DeckCreationFormStyle.deckForm.formField}
        />
        <TouchableOpacity onPress={handleDeckCreation} style={DeckCreationFormStyle.button}>
          <Text style={DeckCreationFormStyle.buttonText}> Add deck </Text>
        </TouchableOpacity>
      </View>

      <Text style={DeckCreationFormStyle.subTitle}>Decks</Text>
    </View>
  );
};
