import firestore from "@react-native-firebase/firestore";

import { Deck, MatchRecord, ArchetypeBase } from "../../../types";

export const deckMatchupRecordsQuery = async ({
  deck,
  limit,
  opponentArchetype,
  favorite,
  pageParam,
}: {
  deck: Deck;
  limit?: number;
  favorite?: boolean;
  opponentArchetype: ArchetypeBase;
  pageParam?: MatchRecord;
}) => {
  let query = firestore()
    .collection("MatchRecords")
    .where("deckId", "==", deck.id)
    .where("opponentArchetype", "==", opponentArchetype)
    .orderBy("createdAt", "desc");
  limit ? (query = query.limit(limit)) : null;
  favorite ? (query = query.where("favorite", "==", true)) : null;
  pageParam ? (query = query.startAfter(pageParam)) : null;

  return query.get();
};
