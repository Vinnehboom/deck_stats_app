import React, { useContext } from "react";
import { FlatList, SafeAreaView } from "react-native";
import { Box } from "native-base";
import auth from "@react-native-firebase/auth";

import { DeckItem } from "../../components/DeckItem";
import { Spinner } from "../../components/Spinner";
import { DecklistScreenStyle } from "../../styles/decks/DecklistScreenStyle";
import { useGetDecks } from "../../components/decks/_queries/useGetDecks";
import { Deck, User } from "../../types";
import { DecksHeader } from "./DecksHeader";
import { Text } from "../../components/layout/Text";
import { TranslationContext } from "../../contexts/TranslationContext";

export const DecksScreen = () => {
  const user = auth().currentUser || ({} as User);
  const { queryResult: decks } = useGetDecks(user!);
  const { t } = useContext(TranslationContext);

  const renderItem = ({ item }: { item: Deck }) => <DeckItem deck={item} />;

  if (!decks) return <Spinner />;

  return (
    <SafeAreaView style={DecklistScreenStyle.container}>
      <FlatList
        data={decks}
        ListEmptyComponent={
          <Text zIndex={-9999} style={DecklistScreenStyle.noDecks}>
            {t("DECKS_SCREEN.NO_DECKS")}
          </Text>
        }
        ListHeaderComponent={<DecksHeader user={user} />}
        renderItem={renderItem}
        ListFooterComponent={<Box minH="100%" />}
        style={DecklistScreenStyle.decksList}
      />
    </SafeAreaView>
  );
};
