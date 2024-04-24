import React, { useContext } from "react";
import { VStack, HStack, Box, Button } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import { Text } from "../../components/layout/Text";
import { Colors, Typography } from "../../styles/variables";
import { MatchupListItem } from "./MatchupListItem";
import { ArchetypeBase, Deck, MatchRecord, MatchRecordDataCollection } from "../../types";
import { RootStackParamList } from "../../types/RouteParams";
import { MatchRecordDataEntry } from "../../types/MatchRecord";
import { TranslationContext } from "../../contexts/TranslationContext";

export const MatchupsList = ({
  data,
  deck,
  viewable,
  matchRecords,
}: {
  archetypes: ArchetypeBase[];
  data: MatchRecordDataCollection;
  deck: Deck;
  viewable?: boolean;
  iconSize?: string;
  matchRecords?: MatchRecord[];
}) => {
  const { t } = useContext(TranslationContext);
  const { push } = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <Box width="95%">
      <VStack space={3}>
        <HStack marginBottom={1} paddingLeft={4} paddingRight={1}>
          <Text fontWeight="bold" fontSize={Typography.fontSizes.xl} width="40%">
            {t("MATCHUP_LIST.ARCHETYPE")}
          </Text>
          <Text
            fontWeight="bold"
            fontSize={Typography.fontSizes.xl}
            width={viewable ? "20%" : "30%"}
            paddingLeft={2}
            textAlign="left">
            {t("MATCHUP_LIST.FIRST")}
          </Text>
          <Text
            fontWeight="bold"
            fontSize={Typography.fontSizes.xl}
            width={viewable ? "20%" : "30%"}
            paddingLeft={3.5}
            textAlign="left">
            {t("MATCHUP_LIST.SECOND")}
          </Text>
          {viewable ? (
            <Text fontWeight="bold" fontSize={Typography.fontSizes.xl} paddingLeft={3} width="20%" textAlign="center">
              {t("MATCHUP_NOTES.NOTES")}
            </Text>
          ) : null}
        </HStack>
      </VStack>
      {Object.keys(data).map((identifier, idx) => {
        const archetypeData: MatchRecordDataEntry = data[identifier];
        return (
          <HStack key={identifier + idx}>
            <MatchupListItem viewable={viewable || false} archetype={archetypeData.archetype} data={archetypeData} />
            {viewable && matchRecords ? (
              <Button
                width="16"
                variant="link"
                right="6"
                onPress={() => push("MatchupNotes", { deck: deck, archetype: archetypeData.archetype })}>
                <FontAwesomeIcon color={Colors["primary-dark"]} icon={faEye} />
              </Button>
            ) : null}
          </HStack>
        );
      })}
    </Box>
  );
};
