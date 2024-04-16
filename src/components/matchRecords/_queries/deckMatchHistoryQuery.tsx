import firestore from "@react-native-firebase/firestore";

import { Deck, MatchRecord } from "../../../types";

export const DeckMatchHistoryQuery = ({
  deck,
  limit,
  nextPageCursor,
}: {
  deck: Deck;
  limit?: number;
  nextPageCursor?: MatchRecord;
}) => {
  let query = firestore().collection("MatchRecords").where("deckId", "==", deck.id).orderBy("createdAt", "desc");
  limit ? (query = query.limit(limit)) : null;
  nextPageCursor ? (query = query.startAfter(nextPageCursor)) : null;
  return query;
};
