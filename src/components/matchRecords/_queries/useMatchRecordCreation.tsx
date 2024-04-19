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
        .set({ ...matchRecord, list: matchRecord.list || null, createdAt: firestore.FieldValue.serverTimestamp() });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["MatchRecords"] });
      onSuccessCallback();
    },
  });
};
