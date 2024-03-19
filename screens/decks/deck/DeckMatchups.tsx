import React, { useState, useEffect, useRef } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Box, Text, View, ScrollView, VStack, HStack } from "native-base";
import { useTranslation } from "react-i18next";

import { DeckListTabParamList } from "../../../types/RouteParams";
import { useGetDeckMatchRecords } from "../../../components/matchRecords/_queries/useGetDeckMatchRecords";
import { ArchetypeBase, MatchRecordDataType } from "../../../types";
import { transformMatchRecordData } from "../../../helpers/matchRecords";
import { Spinner } from "../../../components/Spinner";
import { DeckMatchupsStyle } from "../../../styles/decks/DeckMatchupsStyle";
import { ArchetypeIcons } from "../../../components/decks/ArchetypeIcons";
import { MatchupsList } from "../../../components/decks/MatchupsList";

export const DeckMatchups = () => {
  const { params } = useRoute<RouteProp<DeckListTabParamList, "DeckLists">>();
  const { deck } = params;
  const { t } = useTranslation();
  const { queryResult: records, isFetching, isLoading } = useGetDeckMatchRecords(deck);
  const [data, setData] = useState<MatchRecordDataType>({});
  const [calculating, setCalculating] = useState(false);
  const [archetypes, setArchetypes] = useState<ArchetypeBase[]>([]);
  const bestMuFirst = useRef("");
  const bestMuSecond = useRef("");
  const worstMuFirst = useRef("");
  const worstMuSecond = useRef("");

  useEffect(() => {
    if (!records) return;
    setCalculating(true);

    setArchetypes([...new Set(records?.map(record => record.opponentArchetype))]);
    const calculatedData = transformMatchRecordData(records);
    const musFirstSortedByWinrate = Object.keys(calculatedData).reduce((a, b) =>
      calculatedData[a].first.wr > calculatedData[b].first.wr ? a : b
    );
    const musSecondSortedByWinrate = Object.keys(calculatedData).reduce((a, b) =>
      calculatedData[a].second.wr > calculatedData[b].second.wr ? a : b
    );
    bestMuFirst.current = musFirstSortedByWinrate.slice(0);
    worstMuFirst.current = musFirstSortedByWinrate.slice(-1);
    bestMuSecond.current = musSecondSortedByWinrate.slice(0);
    worstMuSecond.current = musSecondSortedByWinrate.slice(-1);
    setData(calculatedData);
    setCalculating(false);
  }, [isFetching, isLoading, records]);

  return isFetching || calculating || isLoading || !data ? (
    <Spinner />
  ) : (
    <View style={DeckMatchupsStyle.container}>
      <ScrollView style={DeckMatchupsStyle.scrollViewContainer}>
        <Text style={DeckMatchupsStyle.title}>{t("DECK.DECK_MATCHUPS.MATCHUP_DATA")}</Text>
        <HStack maxWidth="100%">
          <Text style={DeckMatchupsStyle.highlightMatchupTitle}>{t("DECK.DECK_MATCHUPS.BEST_MATCHUPS")}</Text>
          <Box>
            <VStack style={DeckMatchupsStyle.highlightMatchupBlock}>
              <HStack style={DeckMatchupsStyle.matchupListEven} space={1}>
                <Text fontSize={14} minWidth="20%" textAlign="center">
                  {t("DECK.DECK_MATCHUPS.FIRST")}
                </Text>
                <Text fontSize={14} maxWidth="20%" textAlign="center">
                  {data[bestMuFirst.current]?.first.wr} %
                </Text>
                <HStack display="flex" justifyContent="flex-end" minWidth="20%">
                  <ArchetypeIcons archetype={archetypes.find(type => type.identifier === bestMuFirst.current)!} />
                </HStack>
              </HStack>
              <HStack style={DeckMatchupsStyle.matchupListOdd} space={1}>
                <Text fontSize={14} width="20%" textAlign="center">
                  {t("DECK.DECK_MATCHUPS.SECOND")}
                </Text>
                <Text fontSize={14} width="20%" textAlign="center">
                  {data[bestMuSecond.current]?.second.wr} %
                </Text>
                <HStack display="flex" justifyContent="flex-end" minWidth="20%">
                  <ArchetypeIcons archetype={archetypes.find(type => type.identifier === bestMuSecond.current)!} />
                </HStack>
              </HStack>
            </VStack>
          </Box>
        </HStack>

        <HStack marginTop={2} maxWidth="100%">
          <Text style={DeckMatchupsStyle.highlightMatchupTitle}> {t("DECK.DECK_MATCHUPS.WORST_MATCHUPS")}</Text>
          <Box>
            <VStack style={DeckMatchupsStyle.highlightMatchupBlock} space={1}>
              <HStack style={DeckMatchupsStyle.matchupListEven}>
                <Text fontSize={14} width="20%" textAlign="center">
                  {t("DECK.DECK_MATCHUPS.FIRST")}
                </Text>
                <Text fontSize={14} width="20%" textAlign="center">
                  {data[worstMuFirst.current]?.first.wr} %
                </Text>
                <ArchetypeIcons archetype={archetypes.find(type => type.identifier === worstMuFirst.current)!} />
              </HStack>
              <HStack style={DeckMatchupsStyle.matchupListOdd}>
                <Text fontSize={14} width="20%" textAlign="center">
                  {t("DECK.DECK_MATCHUPS.SECOND")}
                </Text>
                <Text fontSize={14} width="20%" textAlign="center">
                  {data[worstMuSecond.current]?.second.wr} %
                </Text>
                <HStack display="flex" justifyContent="flex-end" minWidth="20%">
                  <ArchetypeIcons archetype={archetypes.find(type => type.identifier === worstMuSecond.current)!} />
                </HStack>
              </HStack>
            </VStack>
          </Box>
        </HStack>

        <Text style={DeckMatchupsStyle.matchupsTitle}>Win rates</Text>
        <MatchupsList iconSize="xs" matchRecords={records} archetypes={archetypes} data={data} viewable={true} />
      </ScrollView>
    </View>
  );
};
