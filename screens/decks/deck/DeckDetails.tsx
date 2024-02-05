import React from "react";
import { Text, Alert } from "react-native";
import { Container, Button } from "native-base";
import { RouteProp, useRoute } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/core";
import { useTranslation } from "react-i18next";

import { DeckListTabParamsType, MainTabParamList } from "../../../types/RouteParams";
import { useDeckDeletion } from "../../../components/lists/_queries/useDeckDeletion";

export const DeckDetails = () => {
  const { params } = useRoute<RouteProp<DeckListTabParamsType, "Params">>();
  const { deck } = params;
  const { navigate } = useNavigation<MainTabParamList>();
  const { t } = useTranslation();

  const deletionMutation = useDeckDeletion(deck, () => {
    navigate("Decks", undefined);
    showMessage({
      message: t("DECK.DECK_DETAILS.DELETE.SUCCESS"),
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
      { text: t("DECK.DECK_DETAILS.DELETE.CONFIRM"), onPress: deletionMutation.mutate },
    ]);
  };

  return (
    <Container minWidth="100%" safeAreaTop flex={1} justifyContent="center" alignItems="center">
      <Text>{deck.name}</Text>
      <Button mt={3} colorScheme="danger" onPress={handleDeckDeletion}>
        <Text>
          {t("DECK.DECK_DETAILS.DELETE.DELETE_BUTTON")} {deck.name}
        </Text>
      </Button>
    </Container>
  );
};
