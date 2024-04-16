import React, { useState, useRef, useContext } from "react";
import { Box } from "native-base";

import { Spinner } from "../Spinner";
import { MatchRecordList } from "../matchRecords/MatchRecordList";
import { Deck, MatchRecord } from "../../types";
import { Pagination } from "../layout/Pagination";
import { TranslationContext } from "../../contexts/TranslationContext";
import { Text } from "../layout/Text";
import { Typography } from "../../styles/variables";
import { useGetDeckMatchHistory } from "../matchRecords/_queries/useGetDeckMatchHistory";

export const DeckMatchHistory = ({
  deck,
  limit,
  paginated,
}: {
  deck: Deck;
  limit: number;
  recent?: boolean;
  paginated?: boolean;
}) => {
  const { t } = useContext(TranslationContext);
  const [page, setPage] = useState(1);
  const allowNext = useRef<boolean>();
  allowNext.current = true;

  const { isFetching, data, fetchNextPage } = useGetDeckMatchHistory(deck, limit);
  if (isFetching) return <Spinner height={140} description={t("DECK.DECK_MATCH_HISTORY.LOADING")} />;

  return data?.pages[0] && data?.pages[0].docs[0] ? (
    <>
      {data?.pages.map((group, i) => {
        const pageData = group.docs.map(doc => doc.data() as MatchRecord);
        page === i + 1 && pageData.length !== limit ? (allowNext.current = false) : null;
        return (
          <Box key={i} display={i + 1 === page ? "block" : "none"}>
            <MatchRecordList matchRecords={pageData} viewableItems={true} />
          </Box>
        );
      })}
      {paginated ? Pagination({ page, setPage, allowNext: allowNext.current, fetchNextPage }) : null}
    </>
  ) : (
    <Text paddingY={2} paddingBottom={4} alignSelf="center" fontSize={Typography.fontSizes.lg}>
      {t("DECK.DECK_MATCH_HISTORY.NO_DATA")}
    </Text>
  );
};
