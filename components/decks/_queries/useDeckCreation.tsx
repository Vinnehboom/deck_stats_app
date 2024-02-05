import { useMutation, useQueryClient } from "@tanstack/react-query";
import firestore from "@react-native-firebase/firestore";

import { Deck } from "../../../types";

export const useDeckCreation = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (deck: Deck) => {
      firestore().collection("Decks").doc(deck.id).set(deck);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Decks"] });
      onSuccessCallback();
    },
  });
};
