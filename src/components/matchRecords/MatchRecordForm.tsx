import React, { useReducer, SetStateAction, useContext, useEffect, useRef } from "react";
import { Box, Select, Radio, HStack, TextArea, Link } from "native-base";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { Text } from "../../components/layout/Text";
import { InputLabel } from "../layout/forms/InputLabel";
import { Button } from "../layout/Button";
import { ArchetypeSelect } from "../archetypes/ArchetypeSelect";
import { ArchetypeBase, Archetype, Deck } from "../../types";
import { MatchRecord, bo1ResultOptions, allResultOptions, GamesStarted } from "../../types/MatchRecord";
import { isArchetype, isGamesStarted, isResult } from "../../helpers/typeGuards";
import { Colors, Spacing } from "../../styles/variables";
import { useMatchRecordCreation } from "./_queries/useMatchRecordCreation";
import { MatchRecordFormStyle } from "../../styles/matchRecords/MatchRecordFormStyle";
import { RootStackParamList } from "../../types/RouteParams";
import { TranslationContext } from "../../contexts/TranslationContext";
import { useGetDeckLists } from "../lists/_queries/useGetDeckLists";
import { useGetActiveList } from "../lists/_queries/useGetActiveList";
import { Spinner } from "../Spinner";
import { ArchetypeIcons } from "../decks/ArchetypeIcons";
import { setGames } from "../../helpers/matchRecords";

interface RecordStateType extends MatchRecord {
  opponentArchetype: ArchetypeBase | undefined;
  deckArchetype: ArchetypeBase | undefined;
}
type RecordActionType = {
  type:
    | "UPDATE_DECK_ID"
    | "UPDATE_DECK_ARCHETYPE"
    | "CLEAR"
    | "UPDATE_LIST_ID"
    | "UPDATE_COIN_FLIP"
    | "UPDATE_RESULT"
    | "UPDATE_BO3"
    | "UPDATE_STARTED"
    | "UPDATE_OPPONENT_ARCHETYPE"
    | "UPDATE_REMARK";
  payload?: unknown;
};

const recordStateReducer = (state: RecordStateType, action: RecordActionType): RecordStateType => {
  switch (action.type) {
    case "UPDATE_DECK_ID": {
      return typeof action.payload === "string" ? { ...state, deckId: action.payload } : { ...state };
    }
    case "UPDATE_DECK_ARCHETYPE": {
      return isArchetype(action.payload) ? { ...state, deckArchetype: action.payload } : { ...state };
    }
    case "UPDATE_LIST_ID": {
      return typeof action.payload === "string" ? { ...state, listId: action.payload } : { ...state };
    }
    case "UPDATE_OPPONENT_ARCHETYPE": {
      return isArchetype(action.payload) || action.payload === undefined
        ? { ...state, opponentArchetype: action.payload }
        : { ...state };
    }
    case "UPDATE_RESULT": {
      if (isResult(action.payload)) {
        const gamesStarted: GamesStarted = {};
        action.payload.split("").forEach((_result, index) => (gamesStarted[index] = true));
        return { ...state, result: action.payload, gamesStarted };
      } else if (action.payload === "") {
        return { ...state, result: action.payload };
      } else {
        return { ...state };
      }
    }
    case "UPDATE_REMARK": {
      return typeof action.payload === "string" ? { ...state, remarks: action.payload } : { ...state };
    }
    case "UPDATE_COIN_FLIP": {
      return typeof action.payload === "boolean" ? { ...state, coinFlipWon: action.payload } : { ...state };
    }

    case "UPDATE_BO3": {
      return typeof action.payload === "boolean" ? { ...state, bo3: action.payload } : { ...state };
    }
    case "UPDATE_STARTED": {
      const current = state.gamesStarted;
      return isGamesStarted(action.payload) ? { ...state, gamesStarted: { ...current, ...action.payload } } : { ...state };
    }
    case "CLEAR": {
      const baseRecord = {
        ...state,
        id: "",
        result: "",
        games: [],
        bo3: false,
        gamesStarted: {},
        opponentArchetype: undefined,
        remarks: "",
      };
      const payload = action.payload as { started: boolean; coinFlip: boolean };
      if (payload.coinFlip) {
        baseRecord.coinFlipWon = false;
      }
      return baseRecord;
    }
  }
};

export const MatchRecordForm = ({ decks, activeDeck }: { decks: Deck[]; activeDeck: Deck | undefined }) => {
  const coinFlip = useRef<boolean>();
  const initialMatchRecord: RecordStateType = {
    id: "",
    deckId: activeDeck?.id || "",
    deckArchetype: activeDeck?.archetype,
    bo3: false,
    listId: activeList?.list.id || "no-list",
    gamesStarted: {},
    games: [],
    list: activeList?.list,
    result: "",
    opponentArchetype: undefined,
    remarks: "",
  };
  const [matchRecord, matchRecordDispatch] = useReducer(recordStateReducer, initialMatchRecord);
  const selectedDeck = decks.find(deck => deck.id === matchRecord.deckId) || decks[0];

  const { queryResult: lists, isFetching: listsFetching } = useGetDeckLists(selectedDeck);
  const { queryResult: activeList, isFetching: activeListFetching } = useGetActiveList(selectedDeck);

  useEffect(() => {
    matchRecordDispatch({ type: "UPDATE_LIST_ID", payload: activeList?.list?.id || "no-list" });
    matchRecordDispatch({ type: "UPDATE_DECK_ARCHETYPE", payload: selectedDeck.archetype });
  }, [activeList, selectedDeck]);

  if (coinFlip.current) initialMatchRecord.coinFlipWon = false;
  const resultOptions = matchRecord.bo3 ? allResultOptions : bo1ResultOptions;

  const { t } = useContext(TranslationContext);
  const { navigate } = useNavigation<StackNavigationProp<RootStackParamList>>();

  const { push } = useNavigation<StackNavigationProp<RootStackParamList>>();

  const matchRecordCreationMutation = useMatchRecordCreation(() => {
    matchRecordDispatch({ type: "CLEAR", payload: { started: true } });
    showMessage({ message: t("MATCH_RECORD.FORM.SUCCESS"), type: "info" });
  });

  const handleRecordSubmission = () => {
    const record = { ...matchRecord, id: uuidv4() } as MatchRecord;
    const matchRecordValid: boolean =
      [record.result].every(property => property?.length > 0) &&
      record.opponentArchetype !== undefined &&
      isArchetype(record.opponentArchetype);

    if (matchRecordValid) {
      const list = lists.find(l => l.id === record.listId);
      let submitRecord = record;
      initialMatchRecord.bo3 ? (submitRecord.coinFlipWon = coinFlip.current) : null;
      list ? (submitRecord.list = list) : null;
      submitRecord = setGames(submitRecord);
      matchRecordCreationMutation.mutate({ ...submitRecord, list: list });
    } else {
      showMessage({ message: t("MATCH_RECORD.FORM.FAILED"), type: "warning" });
    }
  };

  if (listsFetching || activeListFetching) return <Spinner height={200} />;

  return (
    <Box style={MatchRecordFormStyle.container}>
      <Box>
        <InputLabel>{t("MATCH_RECORD.FORM.DECK")}</InputLabel>
        <Select
          bgColor={Colors.white}
          onValueChange={value => matchRecordDispatch({ type: "UPDATE_DECK_ID", payload: value })}
          selectedValue={selectedDeck.id}
          style={MatchRecordFormStyle.listSelect}>
          {decks &&
            decks.map(deck => (
              <Select.Item
                minWidth="full"
                key={`select-${deck.id}`}
                leftIcon={<ArchetypeIcons archetype={deck.archetype} />}
                label={deck.name}
                value={deck.id}
              />
            ))}
        </Select>
        <Link alignSelf="flex-end" paddingRight={2} onPress={() => navigate("DecklistHome", { deckId: matchRecord.deckId })}>
          <Text style={MatchRecordFormStyle.deckLink}>{t("MATCH_RECORD.FORM.DETAILS")}</Text>
        </Link>
      </Box>
      <Box style={MatchRecordFormStyle.inputBox}>
        <InputLabel>{t("MATCH_RECORD.FORM.LIST")}</InputLabel>
        <Select
          bgColor={Colors.white}
          onValueChange={value => matchRecordDispatch({ type: "UPDATE_LIST_ID", payload: value })}
          selectedValue={matchRecord.listId}
          style={MatchRecordFormStyle.listSelect}>
          <Select.Item minWidth="full" label={t("MATCH_RECORD.FORM.NO_LIST")} value="no-list" />
          {lists &&
            lists.map(list => <Select.Item minWidth="full" key={`select-${list.id}`} label={list.name} value={list.id} />)}
          <Select.Item
            minWidth="full"
            label="++ Add list ++"
            onPress={() => push("DecklistHome", { deckId: selectedDeck.id, screen: "DeckLists" })}
            value="no"
          />
        </Select>
      </Box>
      <Box>
        <InputLabel>{t("MATCH_RECORD.FORM.OPP_ARCHETYPE")}</InputLabel>
        <ArchetypeSelect
          listContainerTop={72}
          selectedArchetype={matchRecord.opponentArchetype}
          setDeckArchetype={(v: SetStateAction<ArchetypeBase | Archetype | undefined>) =>
            matchRecordDispatch({ type: "UPDATE_OPPONENT_ARCHETYPE", payload: v })
          }
        />
      </Box>
      <Box paddingTop={Spacing.xxs} style={MatchRecordFormStyle.inputBox}>
        <Radio.Group
          justifyContent="space-around"
          name="myRadioGroup"
          marginTop={1}
          accessibilityLabel="Format"
          value={matchRecord.bo3 ? "1" : "0"}
          onChange={nextValue => {
            matchRecordDispatch({ type: "UPDATE_BO3", payload: nextValue === "1" });
            coinFlip.current = nextValue === "1";
            matchRecordDispatch({ type: "UPDATE_RESULT", payload: "" });
          }}>
          <HStack space={12}>
            <Radio value="0" my={1}>
              <Text>BO1</Text>
            </Radio>
            <Radio value="1" my={1}>
              <Text>BO3</Text>
            </Radio>
          </HStack>
        </Radio.Group>
      </Box>
      {coinFlip.current && (
        <Box style={MatchRecordFormStyle.inputBox}>
          <InputLabel>{t("MATCH_RECORD.FORM.COIN_FLIP")}</InputLabel>
          <Radio.Group
            justifyContent="space-around"
            name="myRadioGroup"
            accessibilityLabel="Coin flip"
            value={matchRecord.coinFlipWon ? "1" : "0"}
            onChange={nextValue => {
              matchRecordDispatch({ type: "UPDATE_COIN_FLIP", payload: nextValue === "1" });
            }}>
            <HStack space={12}>
              <Radio value="1" my={1}>
                <Text>{t("MATCH_RECORD.FORM.WON")}</Text>
              </Radio>
              <Radio value="0" my={1}>
                <Text>{t("MATCH_RECORD.FORM.LOST")}</Text>
              </Radio>
            </HStack>
          </Radio.Group>
        </Box>
      )}
      <Box style={MatchRecordFormStyle.inputBox}>
        <InputLabel>{t("MATCH_RECORD.FORM.RESULT")}</InputLabel>
        <Select
          bgColor={Colors.white}
          onValueChange={value => matchRecordDispatch({ type: "UPDATE_RESULT", payload: value })}
          selectedValue={matchRecord.result}
          style={MatchRecordFormStyle.listSelect}>
          {resultOptions &&
            resultOptions.map(result => <Select.Item minWidth="full" key={`select-${result}`} label={result} value={result} />)}
        </Select>
      </Box>

      <Box style={MatchRecordFormStyle.inputBox}>
        <InputLabel>{t("MATCH_RECORD.FORM.STARTED")}</InputLabel>
        {matchRecord.result !== "" ? (
          matchRecord.result.split("").map((result, index) => (
            <Radio.Group
              key={result + index}
              justifyContent="space-around"
              name="StartedRadioGroup"
              accessibilityLabel="Started"
              value={matchRecord.gamesStarted[index] ? "1" : "0"}
              onChange={nextValue => {
                matchRecordDispatch({ type: "UPDATE_STARTED", payload: { [index]: nextValue === "1" } });
              }}>
              <HStack space={12}>
                <Text width="5%" fontWeight="bold" paddingTop={1}>
                  {result}
                </Text>
                <Radio value="1" my={1}>
                  <Text>{t("MATCH_RECORD.FORM.FIRST")}</Text>
                </Radio>
                <Radio value="0" my={1}>
                  <Text>{t("MATCH_RECORD.FORM.SECOND")}</Text>
                </Radio>
              </HStack>
            </Radio.Group>
          ))
        ) : (
          <Text>{t("MATCH_RECORD.FORM.NO_RESULT_SELECTED")}</Text>
        )}
      </Box>

      <Box style={MatchRecordFormStyle.inputBox}>
        <InputLabel>{t("MATCH_RECORD.FORM.REMARKS")}</InputLabel>
        <TextArea
          style={MatchRecordFormStyle.input}
          autoCompleteType
          h={60}
          value={matchRecord.remarks}
          onChangeText={text => matchRecordDispatch({ type: "UPDATE_REMARK", payload: text })}
        />
      </Box>
      <Box marginTop={3}>
        <Button onPress={handleRecordSubmission} width="auto" alignSelf="center" text={t("MATCH_RECORD.FORM.SUBMIT")} />
      </Box>
    </Box>
  );
};
