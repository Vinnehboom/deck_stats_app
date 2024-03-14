import { useMutation, useQueryClient } from "@tanstack/react-query";
import firestore from "@react-native-firebase/firestore";

import { Deck, MatchRecord } from "../../../types";

export const useMatchRecordCreation = (deck: Deck, onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (matchRecord: MatchRecord) => {
      firestore()
        .collection("MatchRecords")
        .doc(matchRecord.id)
        .set({ ...matchRecord, createdAt: firestore.FieldValue.serverTimestamp() });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["MatchRecords", { deck: deck.id }] });
      onSuccessCallback();
    },
  });
};
