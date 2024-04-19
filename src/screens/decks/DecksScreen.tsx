import React from "react";
import { FlatList, SafeAreaView } from "react-native";
import auth from "@react-native-firebase/auth";
import { Box } from "native-base";

import { DeckItem } from "../../components/DeckItem";
import { Spinner } from "../../components/Spinner";
import { DecklistScreenStyle } from "../../styles/decks/DecklistScreenStyle";
import { useGetDecks } from "../../components/decks/_queries/useGetDecks";
import { Deck } from "../../types";
import { DecksHeader } from "./DecksHeader";

export const DecksScreen = () => {
  const user = auth().currentUser!;
  const { queryResult: decks } = useGetDecks(user!);

  const renderItem = ({ item }: { item: Deck }) => <DeckItem deck={item} />;

  return (
    <SafeAreaView style={DecklistScreenStyle.container}>
      <FlatList
        data={decks}
        ListEmptyComponent={<Spinner />}
        ListHeaderComponent={DecksHeader({ user })}
        renderItem={renderItem}
        ListFooterComponent={<Box minH="100%" />}
        style={DecklistScreenStyle.decksList}
      />
    </SafeAreaView>
  );
};
