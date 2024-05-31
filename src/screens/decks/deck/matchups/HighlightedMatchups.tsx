import React, { useState, useLayoutEffect, useContext, useRef } from "react";
import { HStack, VStack, Box } from "native-base";

import { Text } from "../../../../components/layout/Text";
import { ArchetypeIcons } from "../../../../components/decks/ArchetypeIcons";
import { ElevatedContainer } from "../../../../components/layout/ElevatedContainer";
import { DeckMatchupsStyle } from "../../../../styles/decks/DeckMatchupsStyle";
import { Spinner } from "../../../../components/Spinner";
import { TranslationContext } from "../../../../contexts/TranslationContext";
import { MatchupsContext } from "../../../../contexts/decks/MatchupsContext";
import { Coinflip } from "../../../../components/matchRecords/Coinflip";

console.log("new");

export const HighlightedMatchups = () => {
  const { t } = useContext(TranslationContext);
  const { data, bo3, archetypes, selectedList } = useContext(MatchupsContext);
  const [calculating, setCalculating] = useState(false);
  const [bestMuFirst, setBestMuFirst] = useState("");
  const [bestMuSecond, setBestMuSecond] = useState("");
  const [worstMuFirst, setWorstMuFirst] = useState("");
  const [worstMuSecond, setWorstMuSecond] = useState("");
  const topAttribute = useRef<"coinFlipWon" | "first">(bo3 ? "coinFlipWon" : "first");
  const bottomAttribute = useRef<"coinFlipLost" | "second">(bo3 ? "coinFlipLost" : "second");

  useLayoutEffect(() => {
    if (!data) return;
    if (Object.keys(data).length < 1) return;
    setCalculating(true);
    const musFirst = Object.keys(data).filter(mu => data[mu]?.[topAttribute.current]?.wr !== null);
    const musSecond = Object.keys(data).filter(mu => data[mu]?.[bottomAttribute.current]?.wr !== null);

    const musFirstSortedByWinrate = musFirst.sort((a, b) =>
      data[a]?.[topAttribute.current]?.wr > data[b]?.[topAttribute.current]?.wr ? -1 : 1
    );
    const musSecondSortedByWinrate = musSecond.sort((a, b) =>
      data[a]?.[bottomAttribute.current]?.wr > data[b]?.[bottomAttribute.current]?.wr ? -1 : 1
    );

    setBestMuFirst(musFirstSortedByWinrate[0]);
    setWorstMuFirst(musFirstSortedByWinrate[musFirstSortedByWinrate.length - 1]);
    setBestMuSecond(musSecondSortedByWinrate[0]);
    setWorstMuSecond(musSecondSortedByWinrate[musSecondSortedByWinrate.length - 1]);
    topAttribute.current = bo3 ? "coinFlipWon" : "first";
    bottomAttribute.current = bo3 ? "coinFlipLost" : "second";
    setCalculating(false);
  }, [data, bestMuFirst, bo3, selectedList]);

  console.log(archetypes.find(type => type.identifier === bestMuFirst)!);
  if (calculating) return <Spinner />;
  return (
    <ElevatedContainer style={DeckMatchupsStyle.highlightMatchupContainer}>
      <HStack>
        <Text style={DeckMatchupsStyle.highlightMatchupTitle}>{t("DECK.DECK_MATCHUPS.BEST_MATCHUPS")}</Text>
        <Box>
          <VStack style={DeckMatchupsStyle.highlightMatchupBlock}>
            <HStack style={DeckMatchupsStyle.matchupListEven} space={1}>
              <Text style={DeckMatchupsStyle.highlightMatchupText}>
                {bo3 ? <Coinflip paddingTop={2} won /> : t("DECK.DECK_MATCHUPS.FIRST")}
              </Text>
              <Text style={DeckMatchupsStyle.highlightMatchupPercentage}>
                {data[bestMuFirst]?.[topAttribute.current]?.wr?.toFixed(2)} %
              </Text>
              <HStack display="flex" marginLeft={2} justifyContent="flex-end" minWidth="20%">
                {bestMuFirst ? (
                  <ArchetypeIcons archetype={archetypes.find(type => type.identifier === bestMuFirst) || "other"} />
                ) : null}
              </HStack>
            </HStack>
            <HStack style={DeckMatchupsStyle.matchupListOdd} space={1}>
              <Text style={DeckMatchupsStyle.highlightMatchupText}>
                {bo3 ? <Coinflip paddingTop={2} won={false} /> : t("DECK.DECK_MATCHUPS.SECOND")}
              </Text>
              <Text style={DeckMatchupsStyle.highlightMatchupPercentage}>
                {data[bestMuSecond]?.[bottomAttribute.current]?.wr?.toFixed(2)} %
              </Text>
              <HStack display="flex" marginLeft={2} justifyContent="flex-end" minWidth="20%">
                {bestMuSecond ? (
                  <ArchetypeIcons archetype={archetypes.find(type => type.identifier === bestMuSecond) || "other"} />
                ) : null}
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
              <Text style={DeckMatchupsStyle.highlightMatchupText}>
                {bo3 ? <Coinflip paddingTop={2} won /> : t("DECK.DECK_MATCHUPS.FIRST")}
              </Text>
              <Text style={DeckMatchupsStyle.highlightMatchupPercentage}>
                {data[worstMuFirst]?.[topAttribute.current]?.wr?.toFixed(2)} %
              </Text>
              <HStack display="flex" marginLeft={2} justifyContent="flex-end" minWidth="20%">
                {worstMuFirst ? (
                  <ArchetypeIcons archetype={archetypes.find(type => type.identifier === worstMuFirst) || "other"} />
                ) : null}
              </HStack>
            </HStack>
            <HStack style={DeckMatchupsStyle.matchupListOdd}>
              <Text style={DeckMatchupsStyle.highlightMatchupText}>
                {bo3 ? <Coinflip paddingTop={2} won={false} /> : t("DECK.DECK_MATCHUPS.SECOND")}
              </Text>
              <Text style={DeckMatchupsStyle.highlightMatchupPercentage}>
                {data[worstMuSecond]?.[bottomAttribute.current]?.wr?.toFixed(2)} %
              </Text>
              <HStack display="flex" marginLeft={2} justifyContent="flex-end" minWidth="20%">
                {worstMuSecond ? (
                  <ArchetypeIcons archetype={archetypes.find(type => type.identifier === worstMuSecond) || "other"} />
                ) : null}
              </HStack>
            </HStack>
          </VStack>
        </Box>
      </HStack>
    </ElevatedContainer>
  );
};
