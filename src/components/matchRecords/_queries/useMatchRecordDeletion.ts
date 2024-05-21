import { useMutation, useQueryClient } from "@tanstack/react-query";
import firestore from "@react-native-firebase/firestore";

import { Deck, MatchRecord } from "../../../types";

export const useMatchRecordDeletion = (deck: Deck, onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();

  const invalidateRecordQueries = () => {
    queryClient.invalidateQueries({ queryKey: ["MatchRecords"] });
  };
  return useMutation({
    mutationFn: async ({ matchRecords }: { matchRecords: MatchRecord[] }) => {
      firestore()
        .collection("MatchRecords")
        .where(
          "id",
          "in",
          matchRecords.map(record => record.id)
        )
        .get()
        .then(({ docs: queriedMatchRecords }) => {
          queriedMatchRecords.forEach(matchRecord => {
            firestore()
              .collection("Games")
              .where("matchRecordId", "==", matchRecord.id)
              .get()
              .then(({ docs: games }) => {
                games.forEach(async game => {
                  firestore().collection("Games").doc(game.id).delete();
                });
              })
              .then(() => firestore().collection("MatchRecords").doc(matchRecord.id).delete())
              .then(() => invalidateRecordQueries());
          });
        });
    },
    onSettled: () => {
      onSuccessCallback();
    },
  });
};
