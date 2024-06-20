import React, { useContext } from "react";
import { VStack, HStack, Box, Button } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import { Text } from "../../components/layout/Text";
import { Colors } from "../../styles/variables";
import { MatchupListItem } from "./MatchupListItem";
import { Deck, MatchRecord } from "../../types";
import { RootStackParamList } from "../../types/RouteParams";
import { MatchRecordDataEntry } from "../../types/MatchRecord";
import { TranslationContext } from "../../contexts/TranslationContext";
import { MatchupsContext } from "../../contexts/decks/MatchupsContext";
import { Coinflip } from "../matchRecords/Coinflip";
import { MatchupListStyle } from "../../styles/decks/MatchupListStyle";

export const MatchupsList = ({
  deck,
  viewable,
  matchRecords,
}: {
  deck: Deck;
  viewable?: boolean;
  iconSize?: string;
  matchRecords?: MatchRecord[];
}) => {
  const { t } = useContext(TranslationContext);
  const { data, bo3 } = useContext(MatchupsContext);
  const { push } = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <Box width="95%">
      <VStack space={3}>
        <HStack marginBottom={1}>
          <Text style={MatchupListStyle.text} width="40%">
            {t("MATCHUP_LIST.ARCHETYPE")}
          </Text>
          <Text style={MatchupListStyle.text} width={viewable ? "20%" : "30%"}>
            {bo3 ? <Coinflip won={true} /> : t("MATCHUP_LIST.FIRST")}
          </Text>
          <Text style={MatchupListStyle.text} width={viewable ? "20%" : "30%"}>
            {bo3 ? <Coinflip won={false} /> : t("MATCHUP_LIST.SECOND")}
          </Text>
          {viewable ? (
            <Text style={MatchupListStyle.text} paddingLeft={3} width="20%">
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
