import firestore from "@react-native-firebase/firestore";

import { useFirebaseQuery } from "../../../helpers/useFireBaseQuery";
import { ArchetypeBase, MatchRecord } from "../../../types";
import { UnknownArchetype } from "../../../types/Archetype";

export const useGetArchetypeMatchRecords = (archetype: ArchetypeBase | UnknownArchetype, recent?: boolean) => {
  return useFirebaseQuery<MatchRecord[]>(
    ["MatchRecords", { archetype: typeof archetype !== "string" && archetype.identifier }],
    async () => {
      let query = firestore().collection("MatchRecords").where("deckArchetype", "==", archetype);
      if (recent) {
        const backDate = new Date();
        backDate.setDate(backDate.getDate() - 14);
        const firestoreTimeStamp = firestore.Timestamp.fromDate(backDate);
        query = query.where("createdAt", ">=", firestoreTimeStamp);
      }

      return typeof archetype === "string" ? Promise.resolve([]) : await query.get();
    }
  );
};
