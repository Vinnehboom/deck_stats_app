import React, { useContext } from "react";
import { FlatList } from "react-native";
import { Box } from "native-base";
import auth from "@react-native-firebase/auth";
import { KeyboardAvoidingView } from "react-native";

import { useGetActiveDeck } from "../../components/decks/_queries/useGetActiveDeck";
import { useAuthContext } from "../../contexts/useAuthContext";
import { LandingScreenStyle } from "../../styles/LandingScreenStyle";
import { Deck } from "../../types";
import { ActiveDeck } from "../../components/decks/ActiveDeck";
import { DeckMatchHistory } from "../../components/decks/DeckMatchHistory";
import { Header } from "../../components/layout/Header";
import { LandingFooter } from "./LandingFooter";
import { LandingHeader } from "./LandingHeader";
import { NoDeck } from "./NoDeck";
import { Spinner } from "../../components/Spinner";
import { TranslationContext } from "../../contexts/TranslationContext";

export const LandingScreen = () => {
  const { signOut } = useAuthContext();
  const user = auth().currentUser;
  const { t } = useContext(TranslationContext);

  const { queryResult: activeDeck } = useGetActiveDeck(user!);
  const deck = activeDeck?.deck as Deck;

  const renderItem = () =>
    deck ? (
      <KeyboardAvoidingView behavior="position" enabled={true}>
        <ActiveDeck deck={deck} />
        <Box style={LandingScreenStyle.recentRecordsContainer}>
          <Header header="h2">{t("LANDING_SCREEN.ACTIVE_DECK.RECORD_FORM.RECENT_RECORDS")}</Header>
          <DeckMatchHistory deck={deck} limit={3} />
        </Box>
      </KeyboardAvoidingView>
    ) : (
      <Spinner />
    );

  return (
    <FlatList
      data={[deck]}
      ListEmptyComponent={NoDeck}
      style={LandingScreenStyle.container}
      renderItem={renderItem}
      ListFooterComponent={LandingFooter({ signOut: signOut! })}
      ListHeaderComponent={LandingHeader}
      keyExtractor={item => item?.name}
    />
  );
};
