import React, { useContext } from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
import { Text, View, HStack, Box } from "native-base";
import { FlatList } from "react-native";

import { MatchupNotesStyle } from "../../styles/matchups/MatchupNotesStyle";
import { RootStackParamList } from "../../types/RouteParams";
import { ArchetypeIcons } from "../../components/decks/ArchetypeIcons";
import { Colors } from "../../styles/variables";
import { Typography } from "../../styles/variables/typography";
import { MatchRecord } from "../../types";
import { TranslationContext } from "../../contexts/TranslationContext";
export const MatchupNotes = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, "MatchupNotes">>();
  const { matchupRecords, archetype: opponentArchetype } = params;
  const archetype = matchupRecords[0].deckArchetype;
  const { t } = useContext(TranslationContext);
  return (
    <View style={MatchupNotesStyle.container}>
      <FlatList
        renderItem={({ item: record }: { item: MatchRecord }) => (
          <Box style={MatchupNotesStyle.noteContainer}>
            <HStack>
              <HStack justifyContent="space-around">
                <Text paddingLeft={3} width="12" justifyContent="center" fontSize={Typography.fontSizes.xl} fontWeight="black">
                  {record.result}
                </Text>
                <Text width="10" fontSize={Typography.fontSizes.xl} fontWeight="black">
                  {record.started ? t("MATCHUP_NOTES.FIRST") : t("MATCHUP_NOTES.SECOND")}
                </Text>
              </HStack>
              <Text fontSize={Typography.fontSizes.md} textAlign="justify" marginLeft="2%" width="64">
                {record.remarks}
              </Text>
            </HStack>
            {record.list?.name ? (
              <HStack display="flex" justifyContent="flex-end" width="100%">
                <Text color={Colors["primary-dark"]} fontWeight="bold">
                  {t("MATCHUP_NOTES.LIST_NAME")}
                </Text>
                <Text color={Colors["primary-dark"]}> {record.list.name}</Text>
              </HStack>
            ) : null}
          </Box>
        )}
        data={matchupRecords}
        ListHeaderComponent={
          <HStack
            width="60%"
            alignSelf="center"
            alignItems="center"
            style={MatchupNotesStyle.header}
            justifyContent="space-around">
            <HStack width="1/3">
              <ArchetypeIcons archetype={archetype} />
            </HStack>
            <Text
              width="1/3"
              textAlign="center"
              alignItems="center"
              fontWeight="black"
              color={Colors["primary-dark"]}
              fontSize={Typography.fontSizes.xl}>
              {t("MATCHUP_NOTES.VS")}
            </Text>
            <HStack width="1/3">
              <ArchetypeIcons archetype={opponentArchetype} />
            </HStack>
          </HStack>
        }
      />
    </View>
  );
};
