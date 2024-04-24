import React, { useContext } from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
import { Text, View, HStack, Box, VStack } from "native-base";
import { FlatList } from "react-native";

import { MatchupNotesStyle } from "../../styles/matchups/MatchupNotesStyle";
import { RootStackParamList } from "../../types/RouteParams";
import { ArchetypeIcons } from "../../components/decks/ArchetypeIcons";
import { Colors } from "../../styles/variables";
import { Typography } from "../../styles/variables/typography";
import { MatchRecord } from "../../types";
import { TranslationContext } from "../../contexts/TranslationContext";
import { useGetDeckMatchupRecords } from "../../components/matchRecords/_queries/useGetDeckMatchupRecords";
import { Spinner } from "../../components/Spinner";

export const MatchupNotes = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, "MatchupNotes">>();
  const { deck, archetype: opponentArchetype } = params;
  const archetype = deck.archetype;
  const { queryResult: matchupRecords } = useGetDeckMatchupRecords({ deck, opponentArchetype });
  const { t } = useContext(TranslationContext);

  if (!matchupRecords) return <Spinner />;

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
              </HStack>
              <Text fontSize={Typography.fontSizes.md} style={MatchupNotesStyle.remarks}>
                {record.remarks}
              </Text>
            </HStack>
            {record.list?.name ? (
              <HStack display="flex" alignItems="flex-end" justifyContent="space-between" width="100%">
                <VStack space={-1}>
                  {record.result.split("").map((resultString, index) => (
                    <Text key={`${record.id}+${index}`}>
                      {resultString} {record.gamesStarted[index] ? t("MATCH_RECORD.FIRST") : t("MATCH_RECORD.SECOND")}
                    </Text>
                  ))}
                </VStack>
                <HStack>
                  <Text color={Colors["primary-dark"]} fontWeight="bold">
                    {t("MATCHUP_NOTES.LIST_NAME")}
                  </Text>
                  <Text color={Colors["primary-dark"]}> {record.list.name}</Text>
                </HStack>
              </HStack>
            ) : null}
          </Box>
        )}
        data={matchupRecords.filter(record => record.remarks.length > 1)}
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
