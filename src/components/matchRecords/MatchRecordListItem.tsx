import { HStack, ChevronDownIcon, ChevronUpIcon, Box, Checkbox } from "native-base";
import React, { useContext, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";

import { Text } from "../../components/layout/Text";
import { MatchRecord } from "../../types";
import { ArchetypeIcons } from "../decks/ArchetypeIcons";
import { MatchRecordListItemStyle } from "../../styles/matchRecords/MatchRecordListItemStyle";
import { TranslationContext } from "../../contexts/TranslationContext";
import { ExportRecordsContext } from "../../contexts/decks/ExportRecordsContext";

export const MatchRecordListItem = ({
  matchRecord,
  iconSize,
  view,
  selected: itemSelected,
}: {
  matchRecord: MatchRecord;
  iconSize?: string;
  view?: boolean;
  selected?: boolean;
}) => {
  const { t } = useContext(TranslationContext);
  const { setSelectedItems, enabled: select } = useContext(ExportRecordsContext);

  const [toggled, setToggled] = useState(false);
  const selected = useRef(itemSelected ? "1" : "0");

  const handleSelect = (selectItem: boolean) => {
    if (selectItem) {
      selected.current = "1";
      setSelectedItems(previousState => previousState.concat(matchRecord));
    } else {
      selected.current = "0";
      setSelectedItems(previousState => {
        return previousState.filter(item => item.id !== matchRecord.id);
      });
    }
  };

  return (
    <HStack left={select ? "-15" : 0}>
      {select ? (
        <Checkbox
          marginRight={2}
          marginTop={3}
          value={selected.current}
          isChecked={selected.current === "1"}
          aria-label="select-record-to-export"
          onChange={value => handleSelect(value)}
        />
      ) : null}
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
    </HStack>
  );
};
