import firestore from "@react-native-firebase/firestore";

import { useFirebaseQuery } from "../../../helpers/useFireBaseQuery";
import { Deck, ActiveList } from "../../../types";

export const useGetActiveList = (deck: Deck) => {
  return useFirebaseQuery<ActiveList>(
    ["ActiveList", { deck: deck.id }],
    async () => {
      return await firestore().collection("ActiveLists").doc(deck.id).get();
    },
    !!deck
  );
};
