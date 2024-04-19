import { createContext } from "react";

import { MatchRecord } from "../../types";
type ExportRecordsContextType = {
  enabled: boolean;
  selectedItems: MatchRecord[];
  setSelectedItems: React.Dispatch<React.SetStateAction<MatchRecord[]>>;
};

export const ExportRecordsContext = createContext<ExportRecordsContextType>({
  enabled: false,
  selectedItems: [],
  setSelectedItems: () => {
    throw {};
  },
});
