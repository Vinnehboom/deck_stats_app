import { useInfiniteQuery } from "@tanstack/react-query";

import { Deck } from "../../../types";
import { DeckMatchHistoryQuery } from "./deckMatchHistoryQuery";

export const useGetDeckMatchHistory = (deck: Deck, limit: number, paginated?: boolean) => {
  const keys = paginated ? ["MatchRecords", { deck: deck.id }, "paginated"] : ["MatchRecords", { deck: deck.id }];
  return useInfiniteQuery({
    queryFn: async ({ pageParam }) => DeckMatchHistoryQuery({ deck, limit, pageParam }),
    initialPageParam: undefined,
    queryKey: keys,
    getNextPageParam: lastPage => lastPage.docs[lastPage.docs.length - 1],
  });
};
