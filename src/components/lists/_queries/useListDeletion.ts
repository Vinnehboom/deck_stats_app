import { useMutation, useQueryClient } from "@tanstack/react-query";
import firestore from "@react-native-firebase/firestore";

import { List } from "../../../types";

export const useListDeletion = (list: List, onSuccessCallback: (recordsDeleted: boolean) => void) => {
  const invalidateRecordQueries = ({ deleteRecords }: { deleteRecords: boolean }) => {
    if (deleteRecords) queryClient.invalidateQueries({ queryKey: ["MatchRecords"] });
  };

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ deleteRecords, active }: { deleteRecords: boolean; active: boolean }) => {
      let query = firestore().collection("Lists").doc(list.id).delete();
      if (deleteRecords) {
        query = query.then(() => {
          firestore()
            .collection("MatchRecords")
            .where("listId", "==", list.id)
            .get()
            .then(({ docs: matchRecords }) => {
              matchRecords.forEach(matchRecord =>
                firestore()
                  .collection("Games")
                  .where("matchRecordId", "==", matchRecord.id)
                  .get()
                  .then(({ docs: games }) => {
                    games.forEach(game => firestore().collection("Games").doc(game.id).delete());
                    firestore().collection("MatchRecords").doc(matchRecord.id).delete();
                  })
                  .then(() => invalidateRecordQueries({ deleteRecords }))
              );
            });
        });
      }
      if (active) {
        query = query.then(() => firestore().collection("ActiveLists").doc(list.deckId).delete());
      }

      return query;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Lists", { deck: list.deckId }] });
      queryClient.invalidateQueries({ queryKey: ["ActiveList", { deck: list.deckId }] });
    },
    onSettled: (_data, _errors, { deleteRecords }) => {
      onSuccessCallback(deleteRecords);
    },
  });
};
