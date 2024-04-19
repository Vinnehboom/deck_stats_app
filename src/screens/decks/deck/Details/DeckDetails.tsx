import React, { useContext } from "react";
import { FlatList } from "react-native";
import { Box } from "native-base";
import { RouteProp, useRoute } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";

import { DeckListTabParamList } from "../../../../types/RouteParams";
import { useGetActiveDeck } from "../../../../components/decks/_queries/useGetActiveDeck";
import { useGetDeckLists } from "../../../../components/lists/_queries/useGetDeckLists";
import { DeckMatchHistory } from "../../../../components/decks/DeckMatchHistory";
import { Header } from "../../../../components/layout/Header";
import { DetailsHeader } from "./DetailsHeader";
import { DetailsFooter } from "./DetailsFooter";
import { Spinner } from "../../../../components/Spinner";
import { TranslationContext } from "../../../../contexts/TranslationContext";
import { DeckDetailsStyle } from "../../../../styles/decks/DeckDetailsStyle";

export const DeckDetails = () => {
  const user = auth().currentUser;
  const { queryResult: activeDeck } = useGetActiveDeck(user!);
  const { params } = useRoute<RouteProp<DeckListTabParamList, "DeckDetails">>();
  const { deck } = params;
  const { queryResult: lists } = useGetDeckLists(deck);

  const { t } = useContext(TranslationContext);

  return activeDeck ? (
    <FlatList
      style={DeckDetailsStyle.container}
      data={[deck]}
      renderItem={() => (
        <Box>
          <Header header="h2">{t("DECK.DECK_DETAILS.RECENT_RESULTS")}</Header>
          <Box style={DeckDetailsStyle.historyContainerWrapper}>
            <Box style={DeckDetailsStyle.historyContainer}>
              <DeckMatchHistory exportable={true} paginated={true} deck={deck} limit={5} />
            </Box>
          </Box>
        </Box>
      )}
      ListHeaderComponent={DetailsHeader({ activeDeck, deck, user: user! })}
      ListFooterComponent={DetailsFooter({ deck, lists })}
    />
  ) : (
    <Spinner />
  );
};
