import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import { Text } from "../../components/layout/Text";
import { LandingScreenStyle } from "../../styles/LandingScreenStyle";
import { MainTabParamList } from "../../types/RouteParams";

export const NoDeck = () => {
  const { navigate } = useNavigation<MainTabParamList>();
  const { t } = useTranslation();

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
