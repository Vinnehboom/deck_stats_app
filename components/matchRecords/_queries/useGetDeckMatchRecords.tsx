import firestore from "@react-native-firebase/firestore";

import { useFirebaseQuery } from "../../../helpers/useFireBaseQuery";
import { Deck, MatchRecord } from "../../../types";

export const useGetDeckMatchRecords = (deck: Deck, limit?: number, recent?: boolean) => {
  return useFirebaseQuery<MatchRecord[]>(["MatchRecords", { deck: deck.id }], async () => {
    let query = firestore().collection("MatchRecords").where("deckId", "==", deck.id);
    if (recent) query = query.orderBy("createdAt", "desc");
    if (limit) query = query.limit(limit);
    return await query.get();
  });
};
