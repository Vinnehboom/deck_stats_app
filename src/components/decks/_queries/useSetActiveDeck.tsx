import { useMutation, useQueryClient } from "@tanstack/react-query";
import firestore from "@react-native-firebase/firestore";

import { Deck, User } from "../../../types";

export const useSetActiveDeck = (deck: Deck, user: User, onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      firestore().collection("ActiveDecks").doc(user.uid).set({ deck: deck });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ActiveDeck"] });
      onSuccessCallback();
    },
  });
};
