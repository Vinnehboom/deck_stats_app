import React, { useReducer, SetStateAction, useContext } from "react";
import { Box, Select, Radio, HStack, TextArea } from "native-base";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { Text } from "../../components/layout/Text";
import { InputLabel } from "../layout/forms/InputLabel";
import { Button } from "../layout/Button";
import { ArchetypeSelect } from "../archetypes/ArchetypeSelect";
import { ArchetypeBase, Archetype, Deck, List } from "../../types";
import { MatchRecord, bo1ResultOptions, allResultOptions } from "../../types/MatchRecord";
import { isArchetype, isResult } from "../../helpers/typeGuards";
import { Colors } from "../../styles/variables";
import { useMatchRecordCreation } from "./_queries/useMatchRecordCreation";
import { MatchRecordFormStyle } from "../../styles/matchRecords/MatchRecordFormStyle";
import { RootStackParamList } from "../../types/RouteParams";
import { TranslationContext } from "../../contexts/TranslationContext";

interface RecordStateType extends MatchRecord {
  opponentArchetype: ArchetypeBase | undefined;
}
type RecordActionType = {
  type:
    | "UPDATE_DECK_ID"
    | "CLEAR"
    | "UPDATE_LIST_ID"
    | "UPDATE_COIN_FLIP"
    | "UPDATE_RESULT"
    | "UPDATE_STARTED"
    | "UPDATE_OPPONENT_ARCHETYPE"
    | "UPDATE_REMARK";
  payload?: unknown | ListPayloadtype;
};

const recordStateReducer = (state: RecordStateType, action: RecordActionType): RecordStateType => {
  switch (action.type) {
    case "UPDATE_DECK_ID": {
      return typeof action.payload === "string" ? { ...state, deckId: action.payload } : { ...state };
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
      return isResult(action.payload) ? { ...state, result: action.payload } : { ...state };
    }
    case "UPDATE_REMARK": {
      return typeof action.payload === "string" ? { ...state, remarks: action.payload } : { ...state };
    }
    case "UPDATE_COIN_FLIP": {
      return typeof action.payload === "boolean" ? { ...state, coinFlipWon: action.payload } : { ...state };
    }
    case "UPDATE_STARTED": {
      return typeof action.payload === "boolean" ? { ...state, started: action.payload } : { ...state };
    }
    case "CLEAR": {
      const baseRecord = {
        ...state,
        id: "",
        result: "",
        opponentArchetype: undefined,
        remarks: "",
      };
      const payload = action.payload as { started: boolean; coinFlip: boolean };
      if (payload)
        if (payload.started) {
          baseRecord.started = false;
        }
      if (payload.coinFlip) {
        baseRecord.started = false;
      }
      return baseRecord;
    }
  }
};

export const MatchRecordForm = ({
  deck,
  lists,
  activeList,
  coinFlip,
  started,
  bo1,
}: {
  deck: Deck;
  lists: List[];
  activeList?: List;
  coinFlip?: boolean;
  started?: boolean;
  bo1?: boolean;
}) => {
  const initialMatchRecord: RecordStateType = {
    id: "",
    deckId: deck.id,
    deckArchetype: deck.archetype,
    listId: activeList?.id || "",
    list: activeList,
    result: "",
    opponentArchetype: undefined,
    remarks: "",
  };
  if (started) initialMatchRecord.started = true;
  if (coinFlip) initialMatchRecord.coinFlipWon = false;
  const resultOptions = bo1 ? bo1ResultOptions : allResultOptions;

  const { t } = useContext(TranslationContext);
  const { push } = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [matchRecord, matchRecordDispatch] = useReducer(recordStateReducer, initialMatchRecord);

  const matchRecordCreationMutation = useMatchRecordCreation(deck, () => {
    showMessage({ message: t("LANDING_SCREEN.ACTIVE_DECK.RECORD_FORM.SUCCESS"), type: "info" });
  });

  const handleRecordSubmission = () => {
    const record = { ...matchRecord, id: uuidv4() } as MatchRecord;
    const matchRecordValid: boolean =
      [record.result].every(property => property?.length > 0) &&
      record.opponentArchetype !== undefined &&
      isArchetype(record.opponentArchetype);

    if (matchRecordValid) {
      const list = lists.find(l => l.id === record.listId);
      matchRecordCreationMutation.mutate({ ...record, list: list });
      matchRecordDispatch({ type: "CLEAR", payload: { started, coinFlip } });
    } else {
      showMessage({ message: t("LANDING_SCREEN.ACTIVE_DECK.RECORD_FORM.FAILED"), type: "warning" });
    }
  };

  return (
    <Box style={MatchRecordFormStyle.container}>
      <Box>
        <InputLabel>{t("LANDING_SCREEN.ACTIVE_DECK.RECORD_FORM.LIST")}</InputLabel>
        <Select
          bgColor={Colors.white}
          onValueChange={value => matchRecordDispatch({ type: "UPDATE_LIST_ID", payload: value })}
          selectedValue={matchRecord.listId}
          style={MatchRecordFormStyle.listSelect}>
          <Select.Item minWidth="full" label={t("LANDING_SCREEN.ACTIVE_DECK.RECORD_FORM.NO_LIST")} value="" />
          {lists &&
            lists.map(list => <Select.Item minWidth="full" key={`select-${list.id}`} label={list.name} value={list.id} />)}
          <Select.Item
            minWidth="full"
            label="++ Add list ++"
            onPress={() => push("DecklistHome", { deckId: deck.id, screen: "DeckLists" })}
            value="no"
          />
        </Select>
      </Box>
      <Box>
        <InputLabel>{t("LANDING_SCREEN.ACTIVE_DECK.RECORD_FORM.OPP_ARCHETYPE")}</InputLabel>
        <ArchetypeSelect
          listContainerTop={72}
          selectedArchetype={matchRecord.opponentArchetype}
          setDeckArchetype={(v: SetStateAction<ArchetypeBase | Archetype | undefined>) =>
            matchRecordDispatch({ type: "UPDATE_OPPONENT_ARCHETYPE", payload: v })
          }
        />
      </Box>
      {coinFlip && (
        <Box style={MatchRecordFormStyle.inputBox}>
          <InputLabel>{t("LANDING_SCREEN.ACTIVE_DECK.RECORD_FORM.COIN_FLIP")}</InputLabel>
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
                <Text>{t("LANDING_SCREEN.ACTIVE_DECK.RECORD_FORM.WON")}</Text>
              </Radio>
              <Radio value="0" my={1}>
                <Text>{t("LANDING_SCREEN.ACTIVE_DECK.RECORD_FORM.LOST")}</Text>
              </Radio>
            </HStack>
          </Radio.Group>
        </Box>
      )}

      {started && (
        <Box style={MatchRecordFormStyle.inputBox}>
          <InputLabel>{t("LANDING_SCREEN.ACTIVE_DECK.RECORD_FORM.STARTED")}</InputLabel>
          <Radio.Group
            justifyContent="space-around"
            name="StartedRadioGroup"
            accessibilityLabel="Started"
            value={matchRecord.started ? "1" : "0"}
            onChange={nextValue => {
              matchRecordDispatch({ type: "UPDATE_STARTED", payload: nextValue === "1" });
            }}>
            <HStack space={12}>
              <Radio value="1" my={1}>
                <Text>{t("LANDING_SCREEN.ACTIVE_DECK.RECORD_FORM.FIRST")}</Text>
              </Radio>
              <Radio value="0" my={1}>
                <Text>{t("LANDING_SCREEN.ACTIVE_DECK.RECORD_FORM.SECOND")}</Text>
              </Radio>
            </HStack>
          </Radio.Group>
        </Box>
      )}
      <Box style={MatchRecordFormStyle.inputBox}>
        <InputLabel>{t("LANDING_SCREEN.ACTIVE_DECK.RECORD_FORM.RESULT")}</InputLabel>
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
        <InputLabel>{t("LANDING_SCREEN.ACTIVE_DECK.RECORD_FORM.REMARKS")}</InputLabel>
        <TextArea
          style={MatchRecordFormStyle.input}
          autoCompleteType
          h={60}
          value={matchRecord.remarks}
          onChangeText={text => matchRecordDispatch({ type: "UPDATE_REMARK", payload: text })}
        />
      </Box>
      <Box marginTop={3}>
        <Button
          onPress={handleRecordSubmission}
          width="auto"
          alignSelf="center"
          text={t("LANDING_SCREEN.ACTIVE_DECK.RECORD_FORM.SUBMIT")}
        />
      </Box>
    </Box>
  );
};
