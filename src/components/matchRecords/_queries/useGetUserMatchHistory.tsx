import firestore from "@react-native-firebase/firestore";

import { useFirebaseQuery } from "../../../helpers/useFireBaseQuery";
import { MatchRecord, Deck, User } from "../../../types";

export const useGetUserMatchHistory = (user: User, decks: Deck[], limit: number) => {
  const deckIds = decks?.map(deck => deck.id);
  return useFirebaseQuery<MatchRecord[]>(["MatchRecords", { user: user.uid }], async () => {
    const query = firestore().collection("MatchRecords").where("deckId", "in", deckIds).orderBy("createdAt", "desc").limit(limit);
    return await query.get();
  });
};
