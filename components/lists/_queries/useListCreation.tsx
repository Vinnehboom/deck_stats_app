import { useMutation, useQueryClient } from "@tanstack/react-query";
import firestore from "@react-native-firebase/firestore";

import { Deck, List } from "../../../types";

export const useListCreation = (deck: Deck, onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (list: List) => {
      firestore().collection("Lists").doc(list.id).set(list);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Lists", { deck: deck.id }] });
      onSuccessCallback();
    },
  });
};
