import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import "react-native-get-random-values";
import { DeckItem } from "../../components/DeckItem";
import { Spinner } from "../../components/Spinner";
import { Deck } from "../../types";
import { DeckCreationForm } from "../../components/decks/DeckCreationForm";
import { DecklistScreenStyle } from "../../styles/decks/DecklistScreenStyle";

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

  if (loading) {
    return (
      <>
        <Spinner />
      </>
    );
  } else {
    return (
      <View style={DecklistScreenStyle.container}>
        <Text style={DecklistScreenStyle.title}> Decklists </Text>
        <DeckCreationForm setCreatedDecks={setCreatedDecks} user={user} />
        <View style={DecklistScreenStyle.decksList}>{displayDecks()}</View>
      </View>
    );
  }
};
