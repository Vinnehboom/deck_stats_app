import React, { useState, useLayoutEffect } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { FlatList, SafeAreaView } from "react-native";
import { Box } from "native-base";

import { Text } from "../../../../components/layout/Text";
import { DeckListTabParamList } from "../../../../types/RouteParams";
import { useGetDeckMatchRecords } from "../../../../components/matchRecords/_queries/useGetDeckMatchRecords";
import { ArchetypeBase, List, MatchRecordDataCollection } from "../../../../types";
import { transformMatchRecordData } from "../../../../helpers/matchRecords";
import { Spinner } from "../../../../components/Spinner";
import { DeckMatchupsStyle } from "../../../../styles/decks/DeckMatchupsStyle";
import { MatchupsList } from "../../../../components/decks/MatchupsList";
import { useGetDeckLists } from "../../../../components/lists/_queries/useGetDeckLists";
import { Header } from "../../../../components/layout/Header";
import { MatchupsHeader } from "./MatchupsHeader";

export const DeckMatchups = () => {
  const { params } = useRoute<RouteProp<DeckListTabParamList, "DeckLists">>();
  const { deck } = params;
  const { t } = useTranslation();
  const { queryResult: records, isFetching, isLoading } = useGetDeckMatchRecords(deck);
  const { queryResult: lists, isFetching: listsFetching, isLoading: listsLoading } = useGetDeckLists(deck);
  const [data, setData] = useState<MatchRecordDataCollection>({});
  const [calculating, setCalculating] = useState(false);
  const [archetypes, setArchetypes] = useState<ArchetypeBase[]>([]);
  const [selectedList, setSelectedList] = useState<List["id"]>("");

  useLayoutEffect(() => {
    if (!records) return;
    const matchRecords = selectedList.length > 1 ? records?.filter(record => record.listId === selectedList) : records;
    if (matchRecords.length < 1) return setData({});
    setCalculating(true);

    setArchetypes([...new Set(matchRecords?.map(record => record.opponentArchetype))]);

    const calculatedData = transformMatchRecordData(matchRecords);
    setData(calculatedData);
    setCalculating(false);
  }, [isFetching, isLoading, records, selectedList]);

  return isFetching || calculating || isLoading || !data || listsFetching || listsLoading ? (
    <Spinner description={t("DECK.DECK_MATCHUPS.LOADING")} />
  ) : (
    <SafeAreaView style={DeckMatchupsStyle.container}>
      <FlatList
        renderItem={() => (
          <Box marginBottom={2} marginX={1} marginRight={1}>
            <Header header="h3">{t("DECK.DECK_MATCHUPS.WIN_RATES")}</Header>
            <MatchupsList iconSize="xs" matchRecords={records} archetypes={archetypes} data={data} viewable={true} />
          </Box>
        )}
        data={[deck]}
        ListHeaderComponent={
          <MatchupsHeader
            selectedList={selectedList}
            setSelectedList={setSelectedList}
            lists={lists}
            data={data}
            archetypes={archetypes}
          />
        }
        ListEmptyComponent={<Text style={DeckMatchupsStyle.noData}> No data! </Text>}
      />
    </SafeAreaView>
  );
};
