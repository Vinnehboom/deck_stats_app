import { useMutation, useQueryClient } from "@tanstack/react-query";
import firestore from "@react-native-firebase/firestore";

import { MatchRecord } from "../../../types";

export const useFavoriteMatchRecord = (onSuccessCallback: (favorite: boolean) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ matchRecord, favorite }: { matchRecord: MatchRecord; favorite: boolean }) => {
      firestore()
        .collection("MatchRecords")
        .doc(matchRecord.id)
        .set({ ...matchRecord, favorite });
    },
    onSuccess: (_data, { favorite }) => {
      onSuccessCallback(favorite);
    },
    onSettled: (_data, _error, { matchRecord }) => {
      queryClient.invalidateQueries({
        queryKey: ["MatchRecords", { deck: matchRecord.deckId }, { matchup: matchRecord.opponentArchetype }],
      });
    },
  });
};
