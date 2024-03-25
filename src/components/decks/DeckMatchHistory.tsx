import React from "react";
import { useTranslation } from "react-i18next";

import { useGetDeckMatchHistory } from "../matchRecords/_queries/useGetDeckMatchHistory";
import { Spinner } from "../Spinner";
import { MatchRecordList } from "../matchRecords/MatchRecordList";
import { Deck } from "../../types";

export const DeckMatchHistory = ({ deck, limit }: { deck: Deck; limit: number; recent?: boolean }) => {
  const { t } = useTranslation();
  const { queryResult: matchRecords, isLoading, isFetching } = useGetDeckMatchHistory(deck, limit);

  return isFetching || isLoading ? (
    <Spinner description={t("DECK.DECK_MATCH_HISTORY.LOADING")} />
  ) : (
    <MatchRecordList matchRecords={matchRecords} viewableItems={true} />
  );
};
