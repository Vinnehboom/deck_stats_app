import { useMutation, useQueryClient } from "@tanstack/react-query";
import firestore from "@react-native-firebase/firestore";

import { useSetActiveList } from "./useSetActiveList";
import { Deck, List } from "../../../types";

export const useListCreation = (deck: Deck, onSuccessCallback: (listActivated?: boolean) => void) => {
  const queryClient = useQueryClient();
  const activeListMutation = useSetActiveList(deck, () => {});

  return useMutation({
    mutationFn: async ({ list }: { list: List; setActive: boolean }) => {
      firestore().collection("Lists").doc(list.id).set(list);
    },
    onSuccess: async (_data, { list, setActive }) => {
      if (setActive) {
        activeListMutation.mutate(list);
      }
      queryClient.invalidateQueries({ queryKey: ["Lists", { deck: deck.id }] });
      onSuccessCallback(setActive);
    },
  });
};
