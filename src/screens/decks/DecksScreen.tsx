import React, { useContext } from "react";
import { FlatList, SafeAreaView } from "react-native";
import { Box } from "native-base";

import { DeckItem } from "../../components/DeckItem";
import { Spinner } from "../../components/Spinner";
import { DecklistScreenStyle } from "../../styles/decks/DecklistScreenStyle";
import { useGetDecks } from "../../components/decks/_queries/useGetDecks";
import { Deck } from "../../types";
import { DecksHeader } from "./DecksHeader";
import { Text } from "../../components/layout/Text";
import { TranslationContext } from "../../contexts/TranslationContext";
import { useAuthContext } from "../../contexts/useAuthContext";

export const DecksScreen = () => {
  const { user } = useAuthContext();
  const { queryResult: decks } = useGetDecks(user!);
  const { t } = useContext(TranslationContext);

  const renderItem = ({ item }: { item: Deck }) => <DeckItem deck={item} />;

  if (!decks) return <Spinner />;

  return (
    <SafeAreaView style={DecklistScreenStyle.container}>
      <FlatList
        data={decks}
        ListEmptyComponent={<Text style={DecklistScreenStyle.noDecks}>{t("DECKS_SCREEN.NO_DECKS")}</Text>}
        ListHeaderComponent={DecksHeader({ user })}
        renderItem={renderItem}
        ListFooterComponent={<Box minH="100%" />}
        style={DecklistScreenStyle.decksList}
      />
    </SafeAreaView>
  );
};
