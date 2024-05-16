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

type SortedData = { [wr: string]: string[] };

export const HighlightedMatchups = () => {
  const { t } = useContext(TranslationContext);
  const { data: personalData, bo3, archetypes, selectedList, global, globalData } = useContext(MatchupsContext);
  const [calculating, setCalculating] = useState(false);
  const [bestMuFirst, setBestMuFirst] = useState("");
  const [bestMuSecond, setBestMuSecond] = useState("");
  const [worstMuFirst, setWorstMuFirst] = useState("");
  const [worstMuSecond, setWorstMuSecond] = useState("");
  const topAttribute = useRef<"coinFlipWon" | "first">(bo3 ? "coinFlipWon" : "first");
  const bottomAttribute = useRef<"coinFlipLost" | "second">(bo3 ? "coinFlipLost" : "second");
  const data = useRef(personalData);

  useLayoutEffect(() => {
    data.current = global ? globalData : personalData;
    if (!data) return;
    if (Object.keys(data).length < 1) return;
    setCalculating(true);
    const musFirst = Object.keys(data.current).filter(mu => data.current[mu]?.[topAttribute.current]?.wr !== null);
    const musSecond = Object.keys(data.current).filter(mu => data.current[mu]?.[bottomAttribute.current]?.wr !== null);

    let musTopGroupedByWinRate = musFirst.reduce<SortedData>((accumulator, archetype) => {
      const wr = data.current[archetype][topAttribute.current]?.wr as number;
      const previousArchetypes = (accumulator[wr] ||= []);
      accumulator[wr] = previousArchetypes.concat(archetype);
      return accumulator;
    }, {});
    const topWrs = Object.keys(musTopGroupedByWinRate).sort((a, b) => (Number(a) > Number(b) ? -1 : 1));
    musTopGroupedByWinRate = topWrs.reduce<SortedData>((accumulator, wr) => {
      const arc = musTopGroupedByWinRate[wr];
      const sortedByGameCount = arc.sort((a, b) =>
        data.current[a][topAttribute.current]?.total > data.current[b][topAttribute.current]?.total ? -1 : 1
      );
      accumulator[wr] = sortedByGameCount;
      return accumulator;
    }, {});

    let musBottomGroupedByWinRate = musSecond.reduce<SortedData>((accumulator, archetype) => {
      const wr = data.current[archetype][bottomAttribute.current]?.wr as number;
      const previousArchetypes = (accumulator[wr] ||= []);
      accumulator[wr] = previousArchetypes.concat(archetype);
      return accumulator;
    }, {});

    const bottomWrs = Object.keys(musBottomGroupedByWinRate).sort((a, b) => (Number(a) > Number(b) ? -1 : 1));

    musBottomGroupedByWinRate = bottomWrs.reduce<SortedData>((accumulator, wr) => {
      const arc = musBottomGroupedByWinRate[wr];
      const sortedByGameCount = arc.sort((a, b) =>
        data.current[a][bottomAttribute.current]?.total > data.current[b][bottomAttribute.current]?.total ? -1 : 1
      );
      accumulator[wr] = sortedByGameCount;
      return accumulator;
    }, {});

    setBestMuFirst(topWrs.length ? musTopGroupedByWinRate[topWrs[0]][0] : "");
    setWorstMuFirst(topWrs.length ? musTopGroupedByWinRate[topWrs[topWrs.length - 1]][0] : "");
    setBestMuSecond(bottomWrs.length ? musBottomGroupedByWinRate[bottomWrs[0]][0] : "");
    setWorstMuSecond(bottomWrs.length ? musBottomGroupedByWinRate[bottomWrs[bottomWrs.length - 1]][0] : "");
    topAttribute.current = bo3 ? "coinFlipWon" : "first";
    bottomAttribute.current = bo3 ? "coinFlipLost" : "second";
    setCalculating(false);
  }, [personalData, bestMuFirst, bo3, selectedList, global, globalData]);

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
                {data.current[bestMuFirst]?.[topAttribute.current]?.wr?.toFixed(2)} %
              </Text>
              <HStack display="flex" marginLeft={2} justifyContent="flex-end" minWidth="20%">
                <ArchetypeIcons archetype={archetypes.find(type => type.identifier === bestMuFirst)!} />
              </HStack>
            </HStack>
            <HStack style={DeckMatchupsStyle.matchupListOdd} space={1}>
              <Text style={DeckMatchupsStyle.highlightMatchupText}>
                {bo3 ? <Coinflip paddingTop={2} won={false} /> : t("DECK.DECK_MATCHUPS.SECOND")}
              </Text>
              <Text style={DeckMatchupsStyle.highlightMatchupPercentage}>
                {data.current[bestMuSecond]?.[bottomAttribute.current]?.wr?.toFixed(2)} %
              </Text>
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
              <Text style={DeckMatchupsStyle.highlightMatchupText}>
                {bo3 ? <Coinflip paddingTop={2} won /> : t("DECK.DECK_MATCHUPS.FIRST")}
              </Text>
              <Text style={DeckMatchupsStyle.highlightMatchupPercentage}>
                {data.current[worstMuFirst]?.[topAttribute.current]?.wr?.toFixed(2)} %
              </Text>
              <HStack display="flex" marginLeft={2} justifyContent="flex-end" minWidth="20%">
                <ArchetypeIcons archetype={archetypes.find(type => type.identifier === worstMuFirst)!} />
              </HStack>
            </HStack>
            <HStack style={DeckMatchupsStyle.matchupListOdd}>
              <Text style={DeckMatchupsStyle.highlightMatchupText}>
                {bo3 ? <Coinflip paddingTop={2} won={false} /> : t("DECK.DECK_MATCHUPS.SECOND")}
              </Text>
              <Text style={DeckMatchupsStyle.highlightMatchupPercentage}>
                {data.current[worstMuSecond]?.[bottomAttribute.current]?.wr?.toFixed(2)} %
              </Text>
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
