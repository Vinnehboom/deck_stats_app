import React from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
import { Text, View, ScrollView, HStack, Box } from "native-base";
import { useTranslation } from "react-i18next";

import { MatchupNotesStyle } from "../../styles/matchups/MatchupNotesStyle";
import { RootStackParamList } from "../../types/RouteParams";
import { ArchetypeIcons } from "../../components/decks/ArchetypeIcons";
import { colors } from "../../utils/colors";
export const MatchupNotes = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, "MatchupNotes">>();
  const { matchupRecords, archetype: opponentArchetype } = params;
  const archetype = matchupRecords[0].deckArchetype;
  const { t } = useTranslation();
  return (
    <View style={MatchupNotesStyle.container}>
      <ScrollView style={MatchupNotesStyle.scrollViewContainer}>
        <HStack width="60%" alignSelf="center" alignItems="center" style={MatchupNotesStyle.header} justifyContent="space-around">
          <HStack width="1/3">
            <ArchetypeIcons archetype={archetype} />
          </HStack>
          <Text
            width="1/3"
            textAlign="center"
            alignItems="center"
            fontWeight="black"
            color={colors["primary-dark"]}
            fontSize={24}>
            {t("MATCHUP_NOTES.VS")}
          </Text>
          <HStack width="1/3">
            <ArchetypeIcons archetype={opponentArchetype} />
          </HStack>
        </HStack>
        {matchupRecords.map(record => {
          return record.remarks.length > 1 ? (
            <Box style={MatchupNotesStyle.noteContainer}>
              <HStack alignItems="center">
                <HStack justifyContent="space-around">
                  <Text paddingLeft={3} width="12" justifyContent="center" fontSize={18} fontWeight="black">
                    {record.result}
                  </Text>
                  <Text width="10" fontSize={18} fontWeight="black">
                    {record.started ? t("MATCHUP_NOTES.FIRST") : t("MATCHUP_NOTES.SECOND")}
                  </Text>
                </HStack>
                <Text fontSize={14} marginLeft="2%" width="60%">
                  {record.remarks}
                </Text>
              </HStack>
            </Box>
          ) : null;
        })}
      </ScrollView>
    </View>
  );
};
