import React, { useContext } from "react";
import { Box, HStack } from "native-base";
import { showMessage } from "react-native-flash-message";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Header } from "../../../../components/layout/Header";
import { Button } from "../../../../components/layout/Button";
import { DeckDetailsStyle } from "../../../../styles/decks/DeckDetailsStyle";
import { MainTabParamList } from "../../../../types/RouteParams";
import { Deck, User } from "../../../../types";
import { useDeckDeletion } from "../../../../components/lists/_queries/useDeckDeletion";
import { useSetActiveDeck } from "../../../../components/decks/_queries/useSetActiveDeck";
import { TranslationContext } from "../../../../contexts/TranslationContext";

export const DetailsHeader = ({ deck, user }: { deck: Deck; user: User }) => {
  const { t } = useContext(TranslationContext);
  const { navigate } = useNavigation<MainTabParamList>();

  const deletionMutation = useDeckDeletion(deck, () => {
    navigate("Decks", undefined);
    showMessage({
      message: t("DECK.DECK_DETAILS.DELETE.SUCCESS"),
      type: "info",
    });
  });

  const handleDeletion = () => {
    deletionMutation.mutate();
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
    <Box style={DeckDetailsStyle.optionsContainer}>
      <Header header="h2">{t("DECK.DECK_DETAILS.OPTIONS.TITLE")}</Header>
      <HStack justifyContent="space-evenly" width="90%" marginX="auto" paddingTop={4}>
        <Button
          text={t("DECK.DECK_DETAILS.ACTIVE_DECK.ACTIVATE_BUTTON")}
          style={DeckDetailsStyle.optionButton}
          colorScheme="primary"
          onPress={handleDeckActivation}
        />
        <Button
          text={t("DECK.DECK_DETAILS.DELETE.DELETE_BUTTON")}
          style={DeckDetailsStyle.optionButton}
          colorScheme="danger"
          onPress={handleDeckDeletion}
        />
      </HStack>
    </Box>
  );
};
