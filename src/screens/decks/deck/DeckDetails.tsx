import React, { useState } from "react";
import { Alert } from "react-native";
import { Button, Box, View, ScrollView, HStack, AddIcon, MinusIcon } from "native-base";
import { RouteProp, useRoute } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/core";
import { useTranslation } from "react-i18next";
import auth from "@react-native-firebase/auth";

import { Text } from "../../../components/layout/Text";
import { DeckDetailsStyle } from "../../../styles/decks/DeckDetailsStyle";
import { ScrollableScreenStyle } from "../../../styles/layout/ScrollableScreenStyle";
import { DeckListTabParamList, MainTabParamList } from "../../../types/RouteParams";
import { useDeckDeletion } from "../../../components/lists/_queries/useDeckDeletion";
import { useSetActiveDeck } from "../../../components/decks/_queries/useSetActiveDeck";
import { useGetActiveDeck } from "../../../components/decks/_queries/useGetActiveDeck";
import { MatchRecordForm } from "../../../components/matchRecords/MatchRecordForm";
import { useGetDeckLists } from "../../../components/lists/_queries/useGetDeckLists";
import { Spinner } from "../../../components/Spinner";
import { colors } from "../../../utils/colors";
import { DeckMatchHistory } from "../../../components/decks/DeckMatchHistory";

export const DeckDetails = () => {
  const user = auth().currentUser;
  const { queryResult: activeDeck } = useGetActiveDeck(user!);
  const { params } = useRoute<RouteProp<DeckListTabParamList, "DeckDetails">>();
  const { deck } = params;
  const { queryResult: lists, isLoading: listsLoading, isFetching: listsFetching } = useGetDeckLists(deck);

  const [showForm, setshowForm] = useState(false);

  const { navigate } = useNavigation<MainTabParamList>();
  const { t } = useTranslation();

  const deletionMutation = useDeckDeletion(deck, () => {
    navigate("Decks", undefined);
    showMessage({
      message: t("DECK.DECK_DETAILS.DELETE.SUCCESS"),
      type: "info",
    });
  });

  const handleDeletion = () => {
    if (deck.id === activeDeck?.deck.id) {
      Alert.alert("You cannot delete your active deck. Please select a new active deck before continuing.");
    } else {
      deletionMutation.mutate();
    }
  };

  const activateDeckMutation = useSetActiveDeck(deck, user!, () => {
    navigate("Landing", undefined);
    showMessage({
      message: t("DECK.DECK_DETAILS.ACTIVE_DECK.SUCCESS"),
      type: "info",
    });
  });

  const handleDeckDeletion = () => {
    Alert.alert(t("DECK.DECK_DETAILS.DELETE.ALERT_TITLE"), t("DECK.DECK_DETAILS.DELETE.ALERT_MESSAGE"), [
      {
        text: t("DECK.DECK_DETAILS.DELETE.CANCEL"),
        onPress: () => {},
        style: "cancel",
      },
      { text: t("DECK.DECK_DETAILS.DELETE.CONFIRM"), onPress: handleDeletion },
    ]);
  };

  const handleDeckActivation = () => {
    Alert.alert(t("DECK.DECK_DETAILS.ACTIVE_DECK.ALERT_TITLE"), t("DECK.DECK_DETAILS.ACTIVE_DECK.ALERT_MESSAGE"), [
      {
        text: t("DECK.DECK_DETAILS.ACTIVE_DECK.CANCEL"),
        onPress: () => {},
        style: "cancel",
      },
      { text: t("DECK.DECK_DETAILS.ACTIVE_DECK.CONFIRM"), onPress: activateDeckMutation.mutate },
    ]);
  };

  return (
    <View style={ScrollableScreenStyle.container}>
      <ScrollView style={ScrollableScreenStyle.scrollViewContainer}>
        <Box style={DeckDetailsStyle.optionsContainer}>
          <Text style={DeckDetailsStyle.optionsTitle}>{t("DECK.DECK_DETAILS.OPTIONS.TITLE")}</Text>
          <HStack justifyContent="space-evenly" width="90%" marginX="auto" paddingTop={4}>
            <Button style={DeckDetailsStyle.optionButton} colorScheme="primary" onPress={handleDeckActivation}>
              <Text style={DeckDetailsStyle.optionButtonText}>{t("DECK.DECK_DETAILS.ACTIVE_DECK.ACTIVATE_BUTTON")}</Text>
            </Button>
            <Button style={DeckDetailsStyle.optionButton} colorScheme="danger" onPress={handleDeckDeletion}>
              <Text style={DeckDetailsStyle.optionButtonText}>
                {t("DECK.DECK_DETAILS.DELETE.DELETE_BUTTON")} {deck.name}
              </Text>
            </Button>
          </HStack>
        </Box>
        <Box>
          <Text style={DeckDetailsStyle.historyTitle}>{t("DECK.DECK_DETAILS.RECENT_RESULTS")}</Text>
          <Box marginX="auto">
            <DeckMatchHistory deck={deck} limit={3} />
          </Box>
        </Box>
        {listsFetching || listsLoading ? (
          <Spinner />
        ) : (
          <>
            <Button
              leftIcon={showForm ? <MinusIcon /> : <AddIcon />}
              variant="link"
              width="50%"
              alignSelf="center"
              onPress={() => setshowForm(!showForm)}>
              <Text fontWeight="bold" color={colors["primary-dark"]} fontSize={18}>
                {showForm ? t("DECK.DECK_DETAILS.RECORD_FORM.HIDE") : t("DECK.DECK_DETAILS.RECORD_FORM.SHOW")}
              </Text>
            </Button>
            {showForm ? (
              <Box alignSelf="center">
                <Box style={DeckDetailsStyle.matchRecordFormContainer}>
                  <Text style={DeckDetailsStyle.formTitle}>{t("DECK.DECK_DETAILS.RECORD_FORM.TITLE")}</Text>
                  <MatchRecordForm bo1={true} started={true} deck={deck} lists={lists} />
                </Box>
              </Box>
            ) : null}
          </>
        )}
      </ScrollView>
    </View>
  );
};
