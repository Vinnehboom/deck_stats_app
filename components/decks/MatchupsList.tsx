import React from "react";
import { VStack, HStack, Box, Text } from "native-base";
import { useTranslation } from "react-i18next";

import { DeckMatchupsStyle } from "../../styles/decks/DeckMatchupsStyle";
import { MatchupListItem } from "./MatchupListItem";
import { ArchetypeBase, MatchRecordDataType } from "../../types";

export const MatchupsList = ({ archetypes, data }: { archetypes: ArchetypeBase[]; data: MatchRecordDataType }) => {
  const { t } = useTranslation();
  return (
    <Box style={DeckMatchupsStyle.matchupContainer} minWidth="100%">
      <VStack space={2}>
        <HStack justifyContent="space-evenly" space={3}>
          <Text fontWeight="bold" fontSize={18} minWidth="40%" paddingLeft="4" textAlign="center">
            {t("MATCHUP_LIST.ARCHETYPE")}
          </Text>
          <Text fontWeight="bold" fontSize={18} minWidth="30%" textAlign="center">
            {t("MATCHUP_LIST.FIRST")}
          </Text>
          <Text fontWeight="bold" fontSize={18} minWidth="30%" textAlign="center">
            {t("MATCHUP_LIST.SECOND")}
          </Text>
        </HStack>
        {Object.keys(data).map((identifier, idx) => {
          const archetypeData = data[identifier];
          const archetype = archetypes.find(arketype => arketype.identifier === identifier)!;
          return (
            <MatchupListItem
              style={idx % 2 === 0 ? DeckMatchupsStyle.matchupListEven : DeckMatchupsStyle.matchupListOdd}
              key={identifier + idx}
              archetype={archetype}
              data={archetypeData}
            />
          );
        })}
      </VStack>
    </Box>
  );
};
