import { useMutation, useQueryClient } from "@tanstack/react-query";
import firestore from "@react-native-firebase/firestore";

import { Deck, List } from "../../../types";

export const useSetActiveList = (deck: Deck, onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (list: List) => {
      firestore().collection("ActiveLists").doc(deck.id).set({ list: list });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ActiveList", { deck: deck.id }] });
      queryClient.invalidateQueries({ queryKey: ["ActiveDeck"] });
      queryClient.invalidateQueries({ queryKey: ["Lists", { deck: deck.id }] });
      onSuccessCallback();
    },
  });
};
