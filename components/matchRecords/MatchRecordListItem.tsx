import { HStack, Text, Button, ChevronDownIcon, ChevronUpIcon } from "native-base";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { MatchRecord } from "../../types";
import { ArchetypeIcons } from "../decks/ArchetypeIcons";
import { MatchRecordListItemStyle } from "../../styles/matchRecords/MatchRecordListItemStyle";
export const MatchRecordListItem = ({
  matchRecord,
  iconSize,
  view,
}: {
  matchRecord: MatchRecord;
  iconSize?: string;
  view?: boolean;
}) => {
  const { t } = useTranslation();
  const [toggled, setToggled] = useState<boolean>(false);
  return (
    <>
      <HStack justifyContent={"space-between"} alignItems={"center"} style={MatchRecordListItemStyle.listItem}>
        <ArchetypeIcons archetype={matchRecord.deckArchetype} size={iconSize} />
        <Text style={MatchRecordListItemStyle.litItemText}>{matchRecord.result}</Text>
        <Text style={MatchRecordListItemStyle.litItemText}>
          {matchRecord.started ? t("MATCH_RECORD.FIRST") : t("MATCH_RECORD.SECOND")}
        </Text>
        <ArchetypeIcons archetype={matchRecord.opponentArchetype} size={iconSize} />
        {view && (
          <Button
            onPress={() => setToggled(!toggled)}
            rightIcon={toggled ? <ChevronUpIcon /> : <ChevronDownIcon />}
            variant={"link"}>
            <Text>{t("MATCH_RECORD.REMARKS")}</Text>
          </Button>
        )}
      </HStack>
      <Text style={MatchRecordListItemStyle.remarks} display={toggled ? "flex" : "none"}>
        {matchRecord.remarks}
      </Text>
    </>
  );
};
