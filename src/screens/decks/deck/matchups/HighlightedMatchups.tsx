import React, { useState, useLayoutEffect, useContext } from "react";
import { HStack, VStack, Box } from "native-base";

import { Text } from "../../../../components/layout/Text";
import { ArchetypeIcons } from "../../../../components/decks/ArchetypeIcons";
import { ElevatedContainer } from "../../../../components/layout/ElevatedContainer";
import { DeckMatchupsStyle } from "../../../../styles/decks/DeckMatchupsStyle";
import { ArchetypeBase, MatchRecordDataCollection } from "../../../../types";
import { Spinner } from "../../../../components/Spinner";
import { TranslationContext } from "../../../../contexts/TranslationContext";

export const HighlightedMatchups = ({ data, archetypes }: { data: MatchRecordDataCollection; archetypes: ArchetypeBase[] }) => {
  const { t } = useContext(TranslationContext);
  const [calculating, setCalculating] = useState(false);
  const [bestMuFirst, setBestMuFirst] = useState("");
  const [bestMuSecond, setBestMuSecond] = useState("");
  const [worstMuFirst, setWorstMuFirst] = useState("");
  const [worstMuSecond, setWorstMuSecond] = useState("");
  useLayoutEffect(() => {
    if (!data) return;
    if (Object.keys(data).length < 1) return;
    setCalculating(true);
    const musFirst = Object.keys(data).filter(mu => data[mu].first.wr !== null);
    const musSecond = Object.keys(data).filter(mu => data[mu].second.wr !== null);

    const musFirstSortedByWinrate = musFirst.sort((a, b) => (data[a].first.wr! > data[b].first.wr! ? -1 : 1));
    const musSecondSortedByWinrate = musSecond.sort((a, b) => (data[a].second.wr! > data[b].second.wr! ? -1 : 1));

    setBestMuFirst(musFirstSortedByWinrate[0]);
    setWorstMuFirst(musFirstSortedByWinrate[musFirstSortedByWinrate.length - 1]);
    setBestMuSecond(musSecondSortedByWinrate[0]);
    setWorstMuSecond(musSecondSortedByWinrate[musSecondSortedByWinrate.length - 1]);
    setCalculating(false);
  }, [data, bestMuFirst]);

  if (calculating) return <Spinner />;
  return (
    <ElevatedContainer style={DeckMatchupsStyle.highlightMatchupContainer}>
      <HStack>
        <Text style={DeckMatchupsStyle.highlightMatchupTitle}>{t("DECK.DECK_MATCHUPS.BEST_MATCHUPS")}</Text>
        <Box>
          <VStack style={DeckMatchupsStyle.highlightMatchupBlock}>
            <HStack style={DeckMatchupsStyle.matchupListEven} space={1}>
              <Text style={DeckMatchupsStyle.highlightMatchupText}>{t("DECK.DECK_MATCHUPS.FIRST")}</Text>
              <Text style={DeckMatchupsStyle.highlightMatchupPercentage}>{data[bestMuFirst]?.first?.wr?.toFixed(2)} %</Text>
              <HStack display="flex" marginLeft={2} justifyContent="flex-end" minWidth="20%">
                <ArchetypeIcons archetype={archetypes.find(type => type.identifier === bestMuFirst)!} />
              </HStack>
            </HStack>
            <HStack style={DeckMatchupsStyle.matchupListOdd} space={1}>
              <Text style={DeckMatchupsStyle.highlightMatchupText}>{t("DECK.DECK_MATCHUPS.SECOND")}</Text>
              <Text style={DeckMatchupsStyle.highlightMatchupPercentage}>{data[bestMuSecond]?.second.wr.toFixed(2)} %</Text>
              <HStack display="flex" marginLeft={2} justifyContent="flex-end" minWidth="20%">
                <ArchetypeIcons archetype={archetypes.find(type => type.identifier === bestMuSecond)!} />
              </HStack>
            </HStack>
          </VStack>
        </Box>
      </HStack>

      <HStack marginTop={2} maxWidth="100%">
        <Text style={DeckMatchupsStyle.highlightMatchupTitle}>{t("DECK.DECK_MATCHUPS.WORST_MATCHUPS")}</Text>
        <Box>
          <VStack style={DeckMatchupsStyle.highlightMatchupBlock} space={1}>
            <HStack style={DeckMatchupsStyle.matchupListEven}>
              <Text style={DeckMatchupsStyle.highlightMatchupText}>{t("DECK.DECK_MATCHUPS.FIRST")}</Text>
              <Text style={DeckMatchupsStyle.highlightMatchupPercentage}>{data[worstMuFirst]?.first.wr.toFixed(2)} %</Text>
              <HStack display="flex" marginLeft={2} justifyContent="flex-end" minWidth="20%">
                <ArchetypeIcons archetype={archetypes.find(type => type.identifier === worstMuFirst)!} />
              </HStack>
            </HStack>
            <HStack style={DeckMatchupsStyle.matchupListOdd}>
              <Text style={DeckMatchupsStyle.highlightMatchupText}>{t("DECK.DECK_MATCHUPS.SECOND")}</Text>
              <Text style={DeckMatchupsStyle.highlightMatchupPercentage}>{data[worstMuSecond]?.second.wr.toFixed(2)} %</Text>
              <HStack display="flex" marginLeft={2} justifyContent="flex-end" minWidth="20%">
                <ArchetypeIcons archetype={archetypes.find(type => type.identifier === worstMuSecond)!} />
              </HStack>
            </HStack>
          </VStack>
        </Box>
      </HStack>
    </ElevatedContainer>
  );
};
