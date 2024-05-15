import React, { useContext } from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
import { Text, View, HStack, Box, VStack } from "native-base";
import { FlatList, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar as faStarFull } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { showMessage } from "react-native-flash-message";

import { MatchupNotesStyle } from "../../styles/matchups/MatchupNotesStyle";
import { RootStackParamList } from "../../types/RouteParams";
import { ArchetypeIcons } from "../../components/decks/ArchetypeIcons";
import { Colors } from "../../styles/variables";
import { Typography } from "../../styles/variables/typography";
import { MatchRecord } from "../../types";
import { TranslationContext } from "../../contexts/TranslationContext";
import { useGetDeckMatchupRecords } from "../../components/matchRecords/_queries/useGetDeckMatchupRecords";
import { Spinner } from "../../components/Spinner";
import { useFavoriteMatchRecord } from "../../components/matchRecords/_queries/useFavoriteMatchRecord";

export const MatchupNotes = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, "MatchupNotes">>();
  const { deck, archetype: opponentArchetype } = params;
  const archetype = deck.archetype;
  const { queryResult: matchupRecords, isFetching } = useGetDeckMatchupRecords({ deck, opponentArchetype });
  const { t } = useContext(TranslationContext);

  const favoriteMutation = useFavoriteMatchRecord(favorite => {
    showMessage({
      message: favorite ? t("MATCHUP_NOTES.FAVORITE.FAVORITED") : t("MATCHUP_NOTES.FAVORITE.UNFAVORITED"),
      type: favorite ? "info" : "warning",
    });
  });

  if (isFetching) return <Spinner />;

  const handleFavorite = (matchRecord: MatchRecord, favorite: boolean) => {
    favoriteMutation.mutate({ matchRecord, favorite });
  };

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

            <HStack display="flex" alignItems="flex-end" justifyContent="space-between" width="100%">
              <VStack space={-1}>
                {record.result.split("").map((resultString, index) => (
                  <Text key={`${record.id}+${index}`}>
                    {resultString} {record.gamesStarted[index] ? t("MATCH_RECORD.FIRST") : t("MATCH_RECORD.SECOND")}
                  </Text>
                ))}
              </VStack>
              <VStack space={3}>
                <TouchableOpacity onPress={() => handleFavorite(record, !record.favorite)} style={MatchupNotesStyle.starIcon}>
                  <FontAwesomeIcon color={Colors["primary-dark"]} size={24} icon={record.favorite ? faStarFull : faStar} />
                </TouchableOpacity>
                {record.list?.name ? (
                  <HStack>
                    <Text color={Colors["primary-dark"]} fontWeight="bold">
                      {t("MATCHUP_NOTES.LIST_NAME")}
                    </Text>
                    <Text color={Colors["primary-dark"]}> {record.list.name}</Text>
                  </HStack>
                ) : null}
              </VStack>
            </HStack>
          </Box>
        )}
        data={matchupRecords?.filter(record => record.remarks.length > 1).sort((a, _b) => (a?.favorite ? -1 : 1))}
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
