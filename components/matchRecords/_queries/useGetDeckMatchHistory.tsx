import firestore from "@react-native-firebase/firestore";

import { useFirebaseQuery } from "../../../helpers/useFireBaseQuery";
import { Deck, MatchRecord } from "../../../types";

export const useGetDeckMatchHistory = (deck: Deck, limit: number) => {
  return useFirebaseQuery<MatchRecord[]>(["MatchRecords", { deck: deck.id }], async () => {
    const query = firestore().collection("MatchRecords").where("deckId", "==", deck.id).orderBy("createdAt", "desc").limit(limit);
    return await query.get();
  });
};
