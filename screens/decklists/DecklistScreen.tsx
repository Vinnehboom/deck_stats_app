import React from "react";
import { Text, View } from "react-native";
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
import { useFirebaseQuery } from "../../helpers/useFireBaseQuery";

export const DecklistScreen = () => {
  const { data: decks, isLoading } = useFirebaseQuery<Deck>(["Decks"], async () => {
    return await firestore().collection("Decks").get();
  });

  const user = auth().currentUser;

  const displayDecks = () => {
    if (decks?.length > 0) {
      return decks.map((deck, index) => <DeckItem key={index + 1} deck={deck} />);
    }
  };

  if (isLoading) {
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
          <DeckCreationForm user={user} />
          <Text style={DeckCreationFormStyle.subTitle}>Decks</Text>
          <View style={DecklistScreenStyle.decksList}>{displayDecks()}</View>
          <Box minH="100%" />
        </ScrollView>
      </View>
    );
  }
};
