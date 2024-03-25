import firestore from "@react-native-firebase/firestore";

import { useFirebaseQuery } from "../../../helpers/useFireBaseQuery";
import { Deck } from "../../../types";

export const useGetDeck = (deckId: Deck["id"]) => {
  return useFirebaseQuery<Deck>(["Deck", { deck: deckId }], async () => {
    return await firestore().collection("Decks").doc(deckId).get();
  });
};
