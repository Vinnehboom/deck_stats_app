import React, { useContext, useState } from "react";
import { HStack, VStack, Box } from "native-base";
import { showMessage } from "react-native-flash-message";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar as faStarFull } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { TouchableOpacity } from "react-native";

import { MatchupNotesStyle } from "../../styles/matchups/MatchupNotesStyle";
import { Text } from "../layout/Text";
import { Colors, Typography } from "../../styles/variables";
import { MatchRecord } from "../../types";
import { TranslationContext } from "../../contexts/TranslationContext";
import { useFavoriteMatchRecord } from "./_queries/useFavoriteMatchRecord";

export const MatchupNote = ({ record }: { record: MatchRecord }) => {
  const { t } = useContext(TranslationContext);
  const [visible, setVisible] = useState(true);

  const favoriteMutation = useFavoriteMatchRecord(favorite => {
    showMessage({
      message: favorite ? t("MATCHUP_NOTES.FAVORITE.FAVORITED") : t("MATCHUP_NOTES.FAVORITE.UNFAVORITED"),
      type: favorite ? "info" : "warning",
    });
  });

  const handleFavorite = (matchRecord: MatchRecord, favorite: boolean) => {
    setVisible(false);
    favoriteMutation.mutate({ matchRecord, favorite });
  };

  return (
    <Box style={MatchupNotesStyle.noteContainer} display={visible ? "block" : "none"}>
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
  );
};
