import React from "react";
import { View } from "react-native";
import auth from "@react-native-firebase/auth";
import { ScrollView, Box } from "native-base";
import { useTranslation } from "react-i18next";

import { DeckItem } from "../../components/DeckItem";
import { Spinner } from "../../components/Spinner";
import { DeckCreationForm } from "../../components/decks/DeckCreationForm";
import { DecklistScreenStyle } from "../../styles/decks/DecklistScreenStyle";
import { useGetDecks } from "../../components/decks/_queries/useGetDecks";
import { Header } from "../../components/layout/Header";

export const DecksScreen = () => {
  const user = auth().currentUser;
  const { queryResult: decks, isLoading } = useGetDecks(user!);
  const { t } = useTranslation();

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
          <DeckCreationForm user={user} />
          <Header zIndex={-1} header="h2">
            {t("DECKS_SCREEN.SUB_TITLE")}
          </Header>
          <View style={DecklistScreenStyle.decksList}>{displayDecks()}</View>
          <Box minH="100%" />
        </ScrollView>
      </View>
    );
  }
};
