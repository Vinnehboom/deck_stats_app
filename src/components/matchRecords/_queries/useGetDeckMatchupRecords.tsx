import { useFirebaseQuery } from "../../../helpers/useFireBaseQuery";
import { ArchetypeBase, Deck, MatchRecord } from "../../../types";
import { deckMatchupRecordsQuery } from "./deckMatchupRecordsQuery";

export const useGetDeckMatchupRecords = ({ deck, opponentArchetype }: { deck: Deck; opponentArchetype: ArchetypeBase }) => {
  return useFirebaseQuery<MatchRecord[]>(["MatchRecords", { deck: deck.id }, { matchup: opponentArchetype }], async () => {
    return deckMatchupRecordsQuery({ deck, opponentArchetype });
  });
};
