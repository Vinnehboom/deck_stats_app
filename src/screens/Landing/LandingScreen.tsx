import React, { useContext } from "react";
import { FlatList } from "react-native";
import { Box } from "native-base";
import auth from "@react-native-firebase/auth";
import { KeyboardAvoidingView } from "react-native";

import { useGetActiveDeck } from "../../components/decks/_queries/useGetActiveDeck";
import { useAuthContext } from "../../contexts/useAuthContext";
import { LandingScreenStyle } from "../../styles/LandingScreenStyle";
import { Header } from "../../components/layout/Header";
import { LandingFooter } from "./LandingFooter";
import { LandingHeader } from "./LandingHeader";
import { NoDeck } from "./NoDeck";
import { Spinner } from "../../components/Spinner";
import { TranslationContext } from "../../contexts/TranslationContext";
import { useGetDecks } from "../../components/decks/_queries/useGetDecks";
import { ElevatedContainer } from "../../components/layout/ElevatedContainer";
import { MatchRecordForm } from "../../components/matchRecords/MatchRecordForm";
import { useGetUserMatchHistory } from "../../components/matchRecords/_queries/useGetUserMatchHistory";
import { MatchRecordList } from "../../components/matchRecords/MatchRecordList";

export const LandingScreen = () => {
  const { signOut } = useAuthContext();
  const user = auth().currentUser;
  const { t } = useContext(TranslationContext);

  const { queryResult: activeDeck } = useGetActiveDeck(user!);
  const { queryResult: decks } = useGetDecks(user!);
  const { queryResult: historyMatchRecords } = useGetUserMatchHistory(user!, decks, 3);

  const renderItem = () => {
    return decks ? (
      decks.length > 0 ? (
        <KeyboardAvoidingView keyboardVerticalOffset={150} behavior="height">
          <ElevatedContainer style={LandingScreenStyle.formContainer}>
            <MatchRecordForm decks={decks} activeDeck={activeDeck?.deck} />
          </ElevatedContainer>
          <Box style={LandingScreenStyle.recentRecordsContainer}>
            <Header header="h2">{t("LANDING_SCREEN.RECENT_RECORDS")}</Header>
            <MatchRecordList matchRecords={historyMatchRecords} viewableItems={true} />
          </Box>
        </KeyboardAvoidingView>
      ) : (
        <NoDeck />
      )
    ) : (
      <Spinner />
    );
  };

  return (
    <FlatList
      data={[decks]}
      ListEmptyComponent={NoDeck}
      style={LandingScreenStyle.container}
      renderItem={renderItem}
      ListFooterComponent={LandingFooter({ signOut: signOut! })}
      ListHeaderComponent={LandingHeader}
      keyExtractor={() => "1"}
    />
  );
};
