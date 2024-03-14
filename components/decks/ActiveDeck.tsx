import { VStack, Box, Text, HStack } from "native-base";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import { MatchRecordForm } from "../matchRecords/MatchRecordForm";
import { LandingScreenStyle } from "../../styles/LandingScreenStyle";
import { Deck } from "../../types";
import { ArchetypeIcons } from "./ArchetypeIcons";
import { MainTabParamList } from "../../types/RouteParams";
import { useGetDeckLists } from "../lists/_queries/useGetDeckLists";
import { colors } from "../../utils/colors";
import { Spinner } from "../Spinner";
import { useGetActiveList } from "../lists/_queries/useGetActiveList";

export const ActiveDeck = ({ deck }: { deck: Deck | undefined }) => {
  const { navigate } = useNavigation<MainTabParamList>();
  const { queryResult: lists, isFetching: listsFetching } = useGetDeckLists(deck);
  const { t } = useTranslation();
  const { queryResult: activeList, isFetching: activeListFetching } = useGetActiveList(deck);

  if (listsFetching || activeListFetching) return <Spinner />;

  return (
    <Box style={[LandingScreenStyle.activeDeckContainer, { backgroundColor: colors.light }]}>
      <VStack width={"100%"} justifyContent={"center"} display={"flex"}>
        <Text style={LandingScreenStyle.activeDeckTitle}>{t("LANDING_SCREEN.ACTIVE_DECK.TITLE")}</Text>
        {deck ? (
          <>
            <HStack style={LandingScreenStyle.activeDeck}>
              <Text style={LandingScreenStyle.activeDeckName}>{deck.name}</Text>
              <ArchetypeIcons archetype={deck?.archetype} size={"xs"} />
            </HStack>
            <MatchRecordForm bo1={true} started={true} activeList={activeList?.list} deck={deck} lists={lists} />
          </>
        ) : (
          <Text style={LandingScreenStyle.setActiveDeckText}>
            Please add an active deck on the{" "}
            <Text style={LandingScreenStyle.setActiveDeckLink} onPress={() => navigate("Decks", undefined)}>
              Decks
            </Text>{" "}
            tab
          </Text>
        )}
      </VStack>
    </Box>
  );
};
