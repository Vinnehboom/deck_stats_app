import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

import { ArchetypeBase, Deck, MatchRecord } from "../../../types";
import { deckMatchupRecordsQuery } from "./deckMatchupRecordsQuery";

export const useInfiniteDeckMatchUpRecords = ({
  deck,
  opponentArchetype,
  limit,
  favorite,
}: {
  deck: Deck;
  opponentArchetype: ArchetypeBase;
  limit: number;
  favorite?: boolean;
}) => {
  const keys = favorite
    ? ["MatchRecords", { deck: deck.id }, { matchup: opponentArchetype }, { favorite }]
    : ["MatchRecords", { deck: deck.id }, { matchup: opponentArchetype }];
  const res = useInfiniteQuery({
    queryFn: async ({ pageParam }) => deckMatchupRecordsQuery({ deck, opponentArchetype, limit, pageParam, favorite }),
    initialPageParam: undefined,
    queryKey: keys,
    getNextPageParam: lastPage => {
      return lastPage.docs[lastPage.docs.length - 1];
    },
  });

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = res;

  const flattenData = useMemo(() => {
    return data?.pages.flatMap(page => page.docs.map(doc => doc.data() as MatchRecord)) || [];
  }, [data?.pages]);

  const loadNext = useCallback(() => {
    hasNextPage && fetchNextPage();
  }, [fetchNextPage, hasNextPage]);

  return {
    ...res,
    data: flattenData,
    onEndReached: loadNext,
    isFetchingNextPage,
  };
};
