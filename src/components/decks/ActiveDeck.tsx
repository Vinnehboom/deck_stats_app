import { VStack, HStack, Link } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { Text } from "../../components/layout/Text";
import { MatchRecordForm } from "../matchRecords/MatchRecordForm";
import { LandingScreenStyle } from "../../styles/LandingScreenStyle";
import { Deck } from "../../types";
import { ArchetypeIcons } from "./ArchetypeIcons";
import { useGetDeckLists } from "../lists/_queries/useGetDeckLists";
import { Colors } from "../../styles/variables";
import { Spinner } from "../Spinner";
import { useGetActiveList } from "../lists/_queries/useGetActiveList";
import { RootStackParamList } from "../../types/RouteParams";
import { ElevatedContainer } from "../layout/ElevatedContainer";

export const ActiveDeck = ({ deck }: { deck: Deck }) => {
  const { queryResult: lists, isFetching: listsFetching } = useGetDeckLists(deck!);
  const { t } = useTranslation();
  const { queryResult: activeList, isFetching: activeListFetching } = useGetActiveList(deck);
  const { navigate } = useNavigation<StackNavigationProp<RootStackParamList>>();

  if (listsFetching || activeListFetching) return <Spinner />;

  return (
    <ElevatedContainer marginTop={3} style={{ backgroundColor: Colors.light }}>
      <VStack width="100%" alignItems="center" display="flex">
        <HStack style={LandingScreenStyle.activeDeck}>
          <Text style={LandingScreenStyle.activeDeckName}>{deck.name}</Text>
          <ArchetypeIcons archetype={deck.archetype} size="xs" />
        </HStack>
        <Link onPress={() => navigate("DecklistHome", { deckId: deck.id })}>
          <Text style={LandingScreenStyle.activeDeckLink}>{t("LANDING_SCREEN.ACTIVE_DECK.DETAILS")}</Text>
        </Link>

        <MatchRecordForm bo1={true} started={true} activeList={activeList?.list} deck={deck} lists={lists} />
      </VStack>
    </ElevatedContainer>
  );
};
