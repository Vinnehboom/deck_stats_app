import React from "react";

import { useGetDeckMatchHistory } from "../matchRecords/_queries/useGetDeckMatchHistory";
import { Spinner } from "../Spinner";
import { MatchRecordList } from "../matchRecords/MatchRecordList";
import { Deck } from "../../types";

export const DeckMatchHistory = ({ deck, limit }: { deck: Deck; limit?: number; recent?: boolean }) => {
  const { queryResult: matchRecords, isLoading, isFetching } = useGetDeckMatchHistory(deck, limit);

  return isFetching || isLoading ? <Spinner /> : <MatchRecordList matchRecords={matchRecords} viewableItems={true} />;
};
