import React from "react";
import { VStack, HStack, Box, Text, Button } from "native-base";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { colors } from "../../utils/colors";
import { DeckMatchupsStyle } from "../../styles/decks/DeckMatchupsStyle";
import { MatchupListItem } from "./MatchupListItem";
import { ArchetypeBase, MatchRecord, MatchRecordDataType } from "../../types";
import { RootStackParamList } from "../../types/RouteParams";
import { MatchRecordDataEntry } from "../../types/MatchRecord";

export const MatchupsList = ({
  data,
  viewable,
  matchRecords,
}: {
  archetypes: ArchetypeBase[];
  data: MatchRecordDataType;
  viewable?: boolean;
  iconSize?: string;
  matchRecords?: MatchRecord[];
}) => {
  const { t } = useTranslation();
  const { push } = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <Box style={DeckMatchupsStyle.matchupContainer} width="100%">
      <VStack space={2}>
        <HStack>
          <Text fontWeight="bold" fontSize={18} width="40%" textAlign="center">
            {t("MATCHUP_LIST.ARCHETYPE")}
          </Text>
          <Text fontWeight="bold" fontSize={18} width={viewable ? "20%" : "30%"} paddingRight={4} textAlign="center">
            {t("MATCHUP_LIST.FIRST")}
          </Text>
          <Text fontWeight="bold" fontSize={18} width={viewable ? "20%" : "30%"} textAlign="center">
            {t("MATCHUP_LIST.SECOND")}
          </Text>
          {viewable ? (
            <Text fontWeight="bold" fontSize={18} paddingLeft={3} width="20%" textAlign="center">
              {t("MATCHUP_NOTES.NOTES")}
            </Text>
          ) : null}
        </HStack>
        {Object.keys(data).map((identifier, idx) => {
          const archetypeData: MatchRecordDataEntry = data[identifier];
          return (
            <HStack key={identifier + idx}>
              <MatchupListItem viewable={viewable || false} archetype={archetypeData.archetype} data={archetypeData} />
              {viewable && matchRecords ? (
                <Button
                  width="16"
                  variant="outline"
                  right="6"
                  onPress={() =>
                    push("MatchupNotes", { matchupRecords: archetypeData.matchRecords, archetype: archetypeData.archetype })
                  }>
                  <Text fontWeight="bold" color={colors["primary-dark"]}>
                    View
                  </Text>
                </Button>
              ) : null}
            </HStack>
          );
        })}
      </VStack>
    </Box>
  );
};
