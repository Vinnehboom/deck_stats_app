import React, { useContext } from "react";
import { Box } from "native-base";

import { Header } from "../../../../components/layout/Header";
import { ArchetypeBase, List, MatchRecordDataCollection } from "../../../../types";
import { HighlightedMatchups } from "./HighlightedMatchups";
import { ListSelect } from "./ListSelect";
import { TranslationContext } from "../../../../contexts/TranslationContext";
export const MatchupsHeader = ({
  data,
  archetypes,
  lists,
  selectedList,
  setSelectedList,
}: {
  data: MatchRecordDataCollection;
  archetypes: ArchetypeBase[];
  lists: List[];
  selectedList: string;
  setSelectedList: (l: string) => void;
}) => {
  const { t } = useContext(TranslationContext);

  return (
    <Box paddingTop={5}>
      <ListSelect lists={lists} selectedList={selectedList} setSelectedList={setSelectedList} />
      <HighlightedMatchups archetypes={archetypes} data={data} />
      <Header header="h2">{t("DECK.DECK_MATCHUPS.MATCHUP_DATA")}</Header>
    </Box>
  );
};
