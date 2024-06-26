import React, { useState, useLayoutEffect, useContext, useRef } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
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
import { MatchupsHeader } from "./MatchupsHeader";
import { TranslationContext } from "../../../../contexts/TranslationContext";
import { MatchupsContext } from "../../../../contexts/decks/MatchupsContext";

export const DeckMatchups = () => {
  const { params } = useRoute<RouteProp<DeckListTabParamList, "DeckLists">>();
  const { deck } = params;
  const { t } = useContext(TranslationContext);
  const { queryResult: records, isLoading } = useGetDeckMatchRecords(deck);
  const { queryResult: lists, isLoading: listsLoading } = useGetDeckLists(deck);
  const [data, setData] = useState<MatchRecordDataCollection>({});
  const [calculating, setCalculating] = useState(false);
  const [archetypes, setArchetypes] = useState<ArchetypeBase[]>([]);
  const [selectedList, setSelectedList] = useState<List["id"]>("");
  const [bo3, setBo3] = useState(false);
  const viewRef = useRef<FlatList>(null);

  useLayoutEffect(() => {
    if (!records) return;
    const matchRecords = selectedList.length > 1 ? records?.filter(record => record.listId === selectedList) : records;
    if (matchRecords.length < 1) return setData({});
    setCalculating(true);

    setArchetypes([...new Set(matchRecords?.map(record => record.opponentArchetype))]);

    const calculatedData = transformMatchRecordData(matchRecords, bo3);
    setData(calculatedData);
    setCalculating(false);
  }, [isLoading, records, selectedList, bo3]);

  const contextValue = {
    bo3,
    setBo3: setBo3,
    data,
    calculating,
    lists,
    selectedList,
    archetypes,
    setSelectedList: setSelectedList,
  };

  return (
    <SafeAreaView style={DeckMatchupsStyle.container}>
      {calculating || isLoading || !data || listsLoading ? (
        <Spinner description={t("DECK.DECK_MATCHUPS.LOADING")} />
      ) : (
        <MatchupsContext.Provider value={contextValue}>
          <FlatList
            ref={viewRef}
            renderItem={() => (
              <Box marginBottom={2} marginX={1} marginRight={1}>
                <MatchupsList deck={deck} iconSize="xs" matchRecords={records} viewable={true} />
              </Box>
            )}
            data={[deck]}
            ListHeaderComponent={
              <>
                <MatchupsHeader exportRef={viewRef} />
              </>
            }
            ListEmptyComponent={<Text style={DeckMatchupsStyle.noData}>{t("DECK.DECK_MATCHUPS.NO_DATA")}</Text>}
          />
        </MatchupsContext.Provider>
      )}
    </SafeAreaView>
  );
};
