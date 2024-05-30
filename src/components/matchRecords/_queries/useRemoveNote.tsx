import { useMutation, useQueryClient } from "@tanstack/react-query";
import firestore from "@react-native-firebase/firestore";

import { MatchRecord } from "../../../types";

export const useRemoveNote = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (matchRecord: MatchRecord) => {
      firestore().collection("MatchRecords").doc(matchRecord.id).update({
        remarks: "",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["MatchRecords"],
      });
      onSuccessCallback();
    },
  });
};
