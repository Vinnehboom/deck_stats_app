import { useMutation, useQueryClient } from "@tanstack/react-query";
import firestore from "@react-native-firebase/firestore";

import { Deck, User } from "../../../types";

export const useSetActiveDeck = (deck: Deck, user: User, onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      firestore().collection("ActivDecks").doc(user.uid).set({ deckId: deck });
    },
    onError: e => console.log(e),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ActiveDeck"] });
      onSuccessCallback();
    },
  });
};
