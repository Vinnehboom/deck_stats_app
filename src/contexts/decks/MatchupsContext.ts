import { createContext } from "react";

import { List, ArchetypeBase, MatchRecordDataCollection } from "../../types";
import { UnknownArchetype } from "../../types/Archetype";

export type MatchupContextType = {
  bo3: boolean;
  setBo3: (b: boolean) => void;
  global: boolean;
  setGlobal: (b: boolean) => void;
  globalFetched: boolean;
  selectedList: List["id"];
  lists: List[];
  archetypes: ArchetypeBase[];
  archetype: ArchetypeBase | UnknownArchetype;
  setSelectedList: (id: string) => void;
  calculating: boolean;
  data: MatchRecordDataCollection;
  globalData: MatchRecordDataCollection;
};

export const MatchupsContext = createContext<MatchupContextType>({
  bo3: false,
  global: false,
  globalData: {},
  setGlobal: () => {
    throw {
      name: "NotImplementedError",
      message: `setGlobal() should be overridden by a useState setter or similar in the component that uses the Matchups Provider.`,
    };
  },
  archetype: "other",
  globalFetched: false,
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
