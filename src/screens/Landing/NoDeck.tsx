import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";

import { Text } from "../../components/layout/Text";
import { LandingScreenStyle } from "../../styles/LandingScreenStyle";
import { MainTabParamList } from "../../types/RouteParams";
import { TranslationContext } from "../../contexts/TranslationContext";

export const NoDeck = () => {
  const { navigate } = useNavigation<MainTabParamList>();
  const { t } = useContext(TranslationContext);

  return (
    <Text style={LandingScreenStyle.setActiveDeckText}>
      {t("LANDING_SCREEN.NO_DECK")}{" "}
      <Text style={LandingScreenStyle.setActiveDeckLink} onPress={() => navigate("Decks", undefined)}>
        {t("LANDING_SCREEN.DECKS")}
      </Text>{" "}
      {t("LANDING_SCREEN.NO_DECK_2")}
    </Text>
  );
};
