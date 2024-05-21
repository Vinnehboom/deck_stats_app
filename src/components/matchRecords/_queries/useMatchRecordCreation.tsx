import { useMutation, useQueryClient } from "@tanstack/react-query";
import firestore from "@react-native-firebase/firestore";

import { MatchRecord } from "../../../types";

export const useMatchRecordCreation = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (matchRecord: MatchRecord) => {
      firestore()
        .collection("MatchRecords")
        .doc(matchRecord.id)
        .set({ ...matchRecord, list: matchRecord.list || null, createdAt: firestore.FieldValue.serverTimestamp() })
        .then(() => {
          matchRecord.games.forEach(game => firestore().collection("Games").doc(game.id).set(game));
        });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["MatchRecords"] });
      onSuccessCallback();
    },
  });
};
