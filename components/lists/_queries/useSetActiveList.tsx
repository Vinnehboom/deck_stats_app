import { useMutation, useQueryClient } from "@tanstack/react-query";
import firestore from "@react-native-firebase/firestore";

import { Deck, List } from "../../../types";

export const useSetActiveList = (deck: Deck, onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (list: List) => {
      firestore()
        .collection("Decks")
        .doc(deck.id)
        .set({ ...deck, activeListId: list.id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ActiveDeck"] });
      onSuccessCallback();
    },
  });
};
