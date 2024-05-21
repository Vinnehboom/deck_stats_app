import firestore from "@react-native-firebase/firestore";

import { Deck, MatchRecord } from "../../../types";

export const DeckMatchHistoryQuery = async ({
  deck,
  limit,
  pageParam,
}: {
  deck: Deck;
  limit?: number;
  pageParam?: MatchRecord;
}) => {
  let query = firestore().collection("MatchRecords").where("deckId", "==", deck.id).orderBy("createdAt", "desc");
  limit ? (query = query.limit(limit)) : null;
  pageParam ? (query = query.startAfter(pageParam)) : null;
  return query.get();
};
