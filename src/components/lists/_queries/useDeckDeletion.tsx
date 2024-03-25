import { useMutation, useQueryClient } from "@tanstack/react-query";
import firestore from "@react-native-firebase/firestore";

import { Deck } from "../../../types";

export const useDeckDeletion = (deck: Deck, onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      firestore().collection("Decks").doc(deck.id).delete();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Decks"] });
      onSuccessCallback();
    },
  });
};
