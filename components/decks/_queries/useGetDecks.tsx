import firestore from "@react-native-firebase/firestore";

import { useFirebaseQuery } from "../../../helpers/useFireBaseQuery";
import { Deck, User } from "../../../types";

export const useGetDecks = (user: User) => {
  return useFirebaseQuery<Deck>(["Decks"], async () => {
    return await firestore().collection("Decks").where("userId", "==", user.uid).get();
  });
};
