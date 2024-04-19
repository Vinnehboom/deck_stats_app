import React from "react";
import { FlatList } from "react-native";
import { Box } from "native-base";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import auth from "@react-native-firebase/auth";

import { DeckListTabParamList } from "../../../../types/RouteParams";
import { useGetActiveDeck } from "../../../../components/decks/_queries/useGetActiveDeck";
import { DeckMatchHistory } from "../../../../components/decks/DeckMatchHistory";
import { Header } from "../../../../components/layout/Header";
import { Colors } from "../../../../styles/variables";
import { DetailsHeader } from "./DetailsHeader";
import { Spinner } from "../../../../components/Spinner";

export const DeckDetails = () => {
  const user = auth().currentUser;
  const { queryResult: activeDeck } = useGetActiveDeck(user!);
  const { params } = useRoute<RouteProp<DeckListTabParamList, "DeckDetails">>();
  const { deck } = params;

  const { t } = useTranslation();

  return activeDeck ? (
    <FlatList
      style={{ backgroundColor: Colors.white }}
      data={[deck]}
      renderItem={() => (
        <Box>
          <Header header="h2">{t("DECK.DECK_DETAILS.RECENT_RESULTS")}</Header>
          <Box marginX="auto">
            <DeckMatchHistory deck={deck} limit={3} />
          </Box>
        </Box>
      )}
      ListHeaderComponent={DetailsHeader({ activeDeck, deck, user: user! })}
    />
  ) : (
    <Spinner />
  );
};
