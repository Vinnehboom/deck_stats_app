import React, { useContext } from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
import { Text, View, HStack } from "native-base";

import { MatchupNotesStyle } from "../../styles/matchups/MatchupNotesStyle";
import { RootStackParamList } from "../../types/RouteParams";
import { ArchetypeIcons } from "../../components/decks/ArchetypeIcons";
import { Colors } from "../../styles/variables";
import { Typography } from "../../styles/variables/typography";
import { TranslationContext } from "../../contexts/TranslationContext";
import { NotesScrollList } from "../../components/matchRecords/NotesScrollList";

export const MatchupNotes = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, "MatchupNotes">>();
  const { deck, archetype: opponentArchetype } = params;
  const archetype = deck.archetype;

  const { t } = useContext(TranslationContext);

  return (
    <View style={MatchupNotesStyle.container}>
      <HStack width="60%" alignSelf="center" alignItems="center" style={MatchupNotesStyle.header} justifyContent="space-around">
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
      <NotesScrollList deck={deck} favorite opponentArchetype={opponentArchetype} title={t("MATCHUP_NOTES.FAVORITE.FAVORITES")} />
      <NotesScrollList deck={deck} opponentArchetype={opponentArchetype} title={t("MATCHUP_NOTES.FAVORITE.OTHER")} />
    </View>
  );
};
