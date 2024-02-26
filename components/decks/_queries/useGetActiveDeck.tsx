import firestore from "@react-native-firebase/firestore";

import { useFirebaseQuery } from "../../../helpers/useFireBaseQuery";
import { ActiveDeck, User } from "../../../types";

export const useGetActiveDeck = (user: User) => {
  return useFirebaseQuery<ActiveDeck | undefined>(["ActiveDeck"], async () => {
    return await firestore().collection("ActiveDecks").doc(user.uid).get();
  });
};
