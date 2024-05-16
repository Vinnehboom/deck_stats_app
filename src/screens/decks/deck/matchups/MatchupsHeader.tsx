import React, { useContext } from "react";
import { Box, Button, Checkbox, HStack, Radio } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { FlatList } from "react-native";

import { Header } from "../../../../components/layout/Header";
import { HighlightedMatchups } from "./HighlightedMatchups";
import { ListSelect } from "./ListSelect";
import { TranslationContext } from "../../../../contexts/TranslationContext";
import { Text } from "../../../../components/layout/Text";
import { DeckMatchupsStyle } from "../../../../styles/decks/DeckMatchupsStyle";
import { MatchupsContext } from "../../../../contexts/decks/MatchupsContext";
import { Spinner } from "../../../../components/Spinner";
import { ShareImage } from "../../../../helpers/exports/ShareImage";

export const MatchupsHeader = ({ exportRef }: { exportRef: React.RefObject<FlatList> }) => {
  const { t } = useContext(TranslationContext);
  const { lists, bo3, setBo3, setSelectedList, selectedList, calculating, global, setGlobal, globalFetched, archetype } =
    useContext(MatchupsContext);

  return (
    <Box paddingY={5}>
      <Box style={DeckMatchupsStyle.filterContainer}>
        {global ? null : <ListSelect lists={lists} selectedList={selectedList} setSelectedList={setSelectedList} />}
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
        {archetype !== "other" ? (
          globalFetched ? (
            <>
              <Checkbox
                alignSelf="center"
                marginY={2}
                value={global ? "1" : "0"}
                isChecked={global}
                onChange={value => setGlobal(value)}>
                <Text fontWeight="bold"> {t("DECK.DECK_MATCHUPS.GLOBAL")}</Text>
              </Checkbox>
              <Text alignSelf="center" fontStyle="italic">
                {t("DECK.DECK_MATCHUPS.GLOBAL_DESCRIPTION")}
              </Text>
            </>
          ) : (
            <Spinner height={10} description={t("DECK.DECK_MATCHUPS.GLOBAL_LOADING")} />
          )
        ) : null}
      </Box>
      <HStack marginTop={-4} alignItems="center" justifyContent="space-evenly">
        <Box />
        <Header header="h2">{t("DECK.DECK_MATCHUPS.MATCHUP_DATA")}</Header>
        <Button marginRight="-7%" variant="link" onPress={async () => await ShareImage(exportRef)}>
          <FontAwesomeIcon color={Colors.primary} size={20} icon={faShareFromSquare} />
        </Button>
      </HStack>

      {calculating ? <Spinner /> : <HighlightedMatchups />}
    </Box>
  );
};
