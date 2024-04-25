import React, { useContext } from "react";
import { Box, HStack, Radio } from "native-base";

import { Header } from "../../../../components/layout/Header";
import { HighlightedMatchups } from "./HighlightedMatchups";
import { ListSelect } from "./ListSelect";
import { TranslationContext } from "../../../../contexts/TranslationContext";
import { Text } from "../../../../components/layout/Text";
import { DeckMatchupsStyle } from "../../../../styles/decks/DeckMatchupsStyle";
import { MatchupsContext } from "../../../../contexts/decks/MatchupsContext";
import { Spinner } from "../../../../components/Spinner";

export const MatchupsHeader = () => {
  const { t } = useContext(TranslationContext);
  const { lists, bo3, setBo3, setSelectedList, selectedList, calculating } = useContext(MatchupsContext);

  return (
    <Box paddingTop={5}>
      <Box style={DeckMatchupsStyle.filterContainer}>
        <ListSelect lists={lists} selectedList={selectedList} setSelectedList={setSelectedList} />
        <HStack width="100%" justifyContent="center">
          <Text style={DeckMatchupsStyle.listSelectTitle} marginTop={1}>
            {t("DECK.DECK_MATCHUPS.FORMAT")}
          </Text>

          <Radio.Group
            justifyContent="space-around"
            name="myRadioGroup"
            marginTop={1}
            accessibilityLabel="Format"
            value={bo3 ? "1" : "0"}
            onChange={nextValue => {
              setBo3(nextValue === "1");
            }}>
            <HStack space={10}>
              <Radio value="0" my={1}>
                <Text>BO1</Text>
              </Radio>
              <Radio value="1" my={1}>
                <Text>BO3</Text>
              </Radio>
            </HStack>
          </Radio.Group>
        </HStack>
      </Box>

      {calculating ? <Spinner /> : <HighlightedMatchups />}
      <Header header="h2">{t("DECK.DECK_MATCHUPS.MATCHUP_DATA")}</Header>
    </Box>
  );
};
