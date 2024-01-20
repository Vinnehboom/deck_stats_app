import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { ScrollView, Box } from "native-base";

import "react-native-get-random-values";
import { DeckItem } from "../../components/DeckItem";
import { Spinner } from "../../components/Spinner";
import { Deck } from "../../types";
import { DeckCreationForm } from "../../components/decks/DeckCreationForm";
import { DecklistScreenStyle } from "../../styles/decks/DecklistScreenStyle";
import { DeckCreationFormStyle } from "../../styles/decks/DeckCreationFormStyle";

export const DecklistScreen = () => {
  const [decks, setDecks] = useState<Deck[] | []>([]);
  const [createdDecks, setCreatedDecks] = useState<Deck[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const user = auth().currentUser;

  useEffect(() => {
    getDecks();
  }, [createdDecks]);

  const getDecks = async () => {
    setLoading(true);
    const snapshot = await firestore().collection("Decks").get();
    const data = snapshot.docs.map(doc => doc.data()) as Deck[];
    setDecks(data);
    setLoading(false);
  };

  const displayDecks = () => {
    if (decks.length > 0) {
      return decks.map((deck, index) => <DeckItem key={index + 1} deck={deck} />);
    }
  };

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
        .doc(deck.id)
        .set(deck)
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

  if (loading) {
    return (
      <>
        <Spinner />
      </>
    );
  } else {
    return (
      <View style={DecklistScreenStyle.container}>
        <ScrollView>
          <Text style={DecklistScreenStyle.title}> Decklists </Text>
          <DeckCreationForm setCreatedDecks={setCreatedDecks} user={user} />
          <Text style={DeckCreationFormStyle.subTitle}>Decks</Text>
          <View style={DecklistScreenStyle.decksList}>{displayDecks()}</View>
          <Box minH="100%" />
        </ScrollView>
      </View>
    );
  }
};
