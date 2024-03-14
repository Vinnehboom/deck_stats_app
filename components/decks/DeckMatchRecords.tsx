import React from "react";

import { useGetDeckMatchRecords } from "../matchRecords/_queries/useGetDeckMatchRecords";
import { Spinner } from "../Spinner";
import { MatchRecordList } from "../matchRecords/MatchRecordList";
import { Deck } from "../../types";

export const DeckMatchRecords = ({ deck, limit, recent }: { deck: Deck; limit?: number; recent?: boolean }) => {
  const { queryResult: matchRecords, isLoading, isFetching } = useGetDeckMatchRecords(deck, limit, recent);

  return isFetching || isLoading ? <Spinner /> : <MatchRecordList matchRecords={matchRecords} viewableItems={true} />;
};
