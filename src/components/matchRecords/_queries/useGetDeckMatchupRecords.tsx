import firestore from "@react-native-firebase/firestore";

import { useFirebaseQuery } from "../../../helpers/useFireBaseQuery";
import { ArchetypeBase, Deck, MatchRecord } from "../../../types";

export const useGetDeckMatchupRecords = ({ deck, opponentArchetype }: { deck: Deck; opponentArchetype: ArchetypeBase }) => {
  return useFirebaseQuery<MatchRecord[]>(["MatchRecords", { deck: deck.id }, { matchup: opponentArchetype }], async () => {
    const query = firestore()
      .collection("MatchRecords")
      .where("deckId", "==", deck.id)
      .where("opponentArchetype", "==", opponentArchetype);
    return await query.get();
  });
};
