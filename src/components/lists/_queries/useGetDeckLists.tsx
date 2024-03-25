import firestore from "@react-native-firebase/firestore";

import { useFirebaseQuery } from "../../../helpers/useFireBaseQuery";
import { List, Deck } from "../../../types";

export const useGetDeckLists = (deck: Deck) => {
  return useFirebaseQuery<List[]>(["Lists", { deck: deck.id }], async () => {
    return await firestore().collection("Lists").where("deckId", "==", deck.id).get();
  });
};
