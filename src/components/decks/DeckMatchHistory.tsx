import React, { useState, useRef, useContext } from "react";
import { Box, HStack, Link } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";

import { Spinner } from "../Spinner";
import { MatchRecordList } from "../matchRecords/MatchRecordList";
import { Deck, MatchRecord } from "../../types";
import { Pagination } from "../layout/Pagination";
import { TranslationContext } from "../../contexts/TranslationContext";
import { Text } from "../layout/Text";
import { Typography } from "../../styles/variables";
import { useGetDeckMatchHistory } from "../matchRecords/_queries/useGetDeckMatchHistory";
import { RootStackParamList } from "../../types/RouteParams";
import { DeckMatchHistoryStyle } from "../../styles/decks/DeckMatchHistoryStyle";
import { ExportRecordsContext } from "../../contexts/decks/ExportRecordsContext";

export const DeckMatchHistory = ({
  deck,
  limit,
  paginated,
  exportable,
}: {
  deck: Deck;
  limit: number;
  recent?: boolean;
  paginated?: boolean;
  exportable?: boolean;
}) => {
  const { t } = useContext(TranslationContext);
  const { push } = useNavigation<RootStackParamList>();
  const [page, setPage] = useState(1);
  const allowNext = useRef<boolean>();
  const [selectedItems, setSelectedItems] = useState<MatchRecord[]>([]);
  allowNext.current = true;

  const exportRecordsContextValue = {
    enabled: exportable || false,
    selectedItems,
    setSelectedItems,
  };

  const { isFetching, data, fetchNextPage } = useGetDeckMatchHistory(deck, limit, paginated);
  if (isFetching) return <Spinner height={140} description={t("DECK.DECK_MATCH_HISTORY.LOADING")} />;

  return data?.pages[0] && data?.pages[0].docs[0] ? (
    <ExportRecordsContext.Provider value={exportRecordsContextValue}>
      {data?.pages.map((group, i) => {
        const pageData = group.docs.map(doc => doc.data() as MatchRecord);
        page === i + 1 && pageData.length !== limit ? (allowNext.current = false) : null;
        return (
          <Box key={i} display={i + 1 === page ? "block" : "none"}>
            <MatchRecordList exportable={exportable} matchRecords={pageData} viewableItems />
          </Box>
        );
      })}
      {paginated ? Pagination({ page, setPage, allowNext: allowNext.current, fetchNextPage }) : null}
      {selectedItems.length > 0 ? (
        <HStack justifyContent="center">
          <Link onPress={() => push("MatchExport", { matchupRecords: selectedItems })}>
            <Text style={DeckMatchHistoryStyle.exportLink}> {t("DECK.DECK_MATCH_HISTORY.EXPORT")}.</Text>
            <FontAwesomeIcon style={DeckMatchHistoryStyle.exportIcon} icon={faFileExport} />
          </Link>
        </HStack>
      ) : null}
    </ExportRecordsContext.Provider>
  ) : (
    <Text paddingY={2} paddingBottom={4} alignSelf="center" fontSize={Typography.fontSizes.lg}>
      {t("DECK.DECK_MATCH_HISTORY.NO_DATA")}
    </Text>
  );
};
