import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LogBox } from "react-native";

import { useGetDeckMatchHistory } from "../matchRecords/_queries/useGetDeckMatchHistory";
import { Spinner } from "../Spinner";
import { MatchRecordList } from "../matchRecords/MatchRecordList";
import { Deck } from "../../types";

export const DeckMatchHistory = ({ deck, limit }: { deck: Deck; limit: number; recent?: boolean }) => {
  const { t } = useTranslation();
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);
  const { queryResult: matchRecords, isLoading, isFetching } = useGetDeckMatchHistory(deck, limit);

  return isFetching || isLoading ? (
    <Spinner description={t("DECK.DECK_MATCH_HISTORY.LOADING")} />
  ) : (
    <MatchRecordList matchRecords={matchRecords} viewableItems={true} />
  );
};
