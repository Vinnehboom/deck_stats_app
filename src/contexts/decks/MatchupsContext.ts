import { createContext } from "react";

import { List, ArchetypeBase, MatchRecordDataCollection } from "../../types";

export type MatchupContextType = {
  bo3: boolean;
  setBo3: (b: boolean) => void;
  selectedList: List["id"];
  lists: List[];
  archetypes: ArchetypeBase[];
  setSelectedList: (id: string) => void;
  calculating: boolean;
  data: MatchRecordDataCollection;
};

export const MatchupsContext = createContext<MatchupContextType>({
  bo3: false,
  setBo3: () => {
    throw {
      name: "NotImplementedError",
      message: `setBo3() should be overridden by a useState setter or similar in the component that uses the Matchups Provider.`,
    };
  },
  selectedList: "",
  lists: [],
  archetypes: [],
  setSelectedList: () => {
    throw {
      name: "NotImplementedError",
      message: `setSelectedList() should be overridden by a useState setter or similar in the component that uses the Matchups Provider.`,
    };
  },
  data: {},
  calculating: false,
});
