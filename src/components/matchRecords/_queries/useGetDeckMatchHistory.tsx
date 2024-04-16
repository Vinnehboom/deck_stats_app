import { useInfiniteQuery } from "@tanstack/react-query";

import { useFirebaseQuery } from "../../../helpers/useFireBaseQuery";
import { Deck, MatchRecord } from "../../../types";
import { DeckMatchHistoryQuery } from "./deckMatchHistoryQuery";

export const useGetDeckMatchHistory = (deck: Deck, limit: number) => {
  const { data: latest } = useFirebaseQuery<MatchRecord>(
    ["latest", "MatchRecords", { deck: deck.id }],
    async () => await DeckMatchHistoryQuery({ deck, limit: 1 }).get()
  );

  return useInfiniteQuery({
    queryFn: async ({ pageParam }) => {
      const cursor = pageParam || false;
      return await DeckMatchHistoryQuery({ deck, limit, nextPageCursor: cursor }).get();
    },
    initialPageParam: latest && latest[0],
    queryKey: ["MatchRecords", { deck: deck.id }, "paginated"],
    getNextPageParam: lastPage => lastPage.docs[lastPage.docs.length - 1],
  });
};
