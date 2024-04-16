import { HStack, ChevronDownIcon, ChevronUpIcon, Box } from "native-base";
import React, { useContext, useState } from "react";
import { TouchableOpacity } from "react-native";

import { Text } from "../../components/layout/Text";
import { MatchRecord } from "../../types";
import { ArchetypeIcons } from "../decks/ArchetypeIcons";
import { MatchRecordListItemStyle } from "../../styles/matchRecords/MatchRecordListItemStyle";
import { TranslationContext } from "../../contexts/TranslationContext";
export const MatchRecordListItem = ({
  matchRecord,
  iconSize,
  view,
}: {
  matchRecord: MatchRecord;
  iconSize?: string;
  view?: boolean;
}) => {
  const { t } = useContext(TranslationContext);
  const [toggled, setToggled] = useState(false);
  return (
    <TouchableOpacity onPress={() => setToggled(!toggled)}>
      <HStack justifyContent="space-between" alignItems="center" style={MatchRecordListItemStyle.listItem}>
        <ArchetypeIcons archetype={matchRecord.deckArchetype} size={iconSize} />
        <Text style={MatchRecordListItemStyle.litItemText}>{matchRecord.result}</Text>
        <Text style={MatchRecordListItemStyle.litItemText}>
          {matchRecord.started ? t("MATCH_RECORD.FIRST") : t("MATCH_RECORD.SECOND")}
        </Text>
        <ArchetypeIcons archetype={matchRecord.opponentArchetype} size={iconSize} />
        {view && (
          <HStack marginLeft={-2}>
            <Text>{t("MATCH_RECORD.REMARKS")}</Text>
            <Box paddingTop={1} paddingLeft={1}>
              {toggled ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </Box>
          </HStack>
        )}
      </HStack>
      <Text style={MatchRecordListItemStyle.remarks} display={toggled ? "flex" : "none"}>
        {matchRecord.remarks}
      </Text>
    </TouchableOpacity>
  );
};
