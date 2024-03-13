import { StyleSheet } from "react-native";
import React, { useReducer } from "react";
import { Box, Text, Select, Radio, HStack, TextArea, Button } from "native-base";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import { showMessage } from "react-native-flash-message";

import { ArchetypeSelect } from "../archetypes/ArchetypeSelect";
import { ArchetypeBase, Archetype, Deck, List } from "../../types";
import { MatchRecord, bo1ResultOptions, allResultOptions } from "../../types/MatchRecord";
import { isArchetype, isResult } from "../../helpers/typeGuards";
import { colors } from "../../utils/colors";
import { useMatchRecordCreation } from "./_queries/useMatchRecordCreation";

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
  payload?: unknown;
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
        listId: "",
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
    result: "",
    opponentArchetype: undefined,
    remarks: "",
  };
  if (started) initialMatchRecord.started = false;
  if (coinFlip) initialMatchRecord.coinFlipWon = false;
  const resultOptions = bo1 ? bo1ResultOptions : allResultOptions;

  const { t } = useTranslation();
  const [matchRecord, matchRecordDispatch] = useReducer(recordStateReducer, initialMatchRecord);

  const matchRecordCreationMutation = useMatchRecordCreation(deck, () => {
    showMessage({ message: t("LANDING_SCREEN.ACTIVE_DECK.RECORD_FORM.SUCCESS"), type: "info" });
  });

  const handleRecordSubmission = () => {
    const record = { ...matchRecord, id: uuidv4() } as MatchRecord;
    console.log(record);

    const matchRecordValid: boolean =
      [record.listId, record.result].every(property => property?.length > 0) &&
      record.opponentArchetype !== undefined &&
      isArchetype(record.opponentArchetype);

    if (matchRecordValid) {
      matchRecordCreationMutation.mutate(record);
      matchRecordDispatch({ type: "CLEAR", payload: { started, coinFlip } });
    } else {
      showMessage({ message: t("LANDING_SCREEN.ACTIVE_DECK.RECORD_FORM.FAILED"), type: "warning" });
    }
  };

  return (
    <Box style={styles.container}>
      <Box>
        <Text style={styles.inputLabel}>{t("LANDING_SCREEN.ACTIVE_DECK.RECORD_FORM.LIST")}</Text>
        <Select
          bgColor={colors.white}
          onValueChange={value => matchRecordDispatch({ type: "UPDATE_LIST_ID", payload: value })}
          selectedValue={matchRecord.listId}
          style={styles.listSelect}>
          {lists &&
            lists.map(list => <Select.Item minWidth={"full"} key={`select-${list.id}`} label={list.name} value={list.id} />)}
        </Select>
      </Box>
      <Box>
        <Text style={styles.inputLabel}>{t("LANDING_SCREEN.ACTIVE_DECK.RECORD_FORM.OPP_ARCHETYPE")}</Text>
        <ArchetypeSelect
          listContainerTop={60}
          selectedArchetype={matchRecord.opponentArchetype}
          setDeckArchetype={(v: ArchetypeBase | Archetype | undefined) =>
            matchRecordDispatch({ type: "UPDATE_OPPONENT_ARCHETYPE", payload: v })
          }
        />
      </Box>
      {coinFlip && (
        <Box style={styles.inputBox}>
          <Text style={styles.inputLabel}>{t("LANDING_SCREEN.ACTIVE_DECK.RECORD_FORM.COIN_FLIP")}</Text>
          <Radio.Group
            justifyContent={"space-around"}
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
        <Box style={styles.inputBox}>
          <Text style={styles.inputLabel}>{t("LANDING_SCREEN.ACTIVE_DECK.RECORD_FORM.STARTED")}</Text>
          <Radio.Group
            justifyContent={"space-around"}
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

      <Box style={styles.inputBox}>
        <Text style={styles.inputLabel}>{t("LANDING_SCREEN.ACTIVE_DECK.RECORD_FORM.RESULT")}</Text>
        <Select
          bgColor={colors.white}
          onValueChange={value => matchRecordDispatch({ type: "UPDATE_RESULT", payload: value })}
          selectedValue={matchRecord.result}
          style={styles.listSelect}>
          {resultOptions &&
            resultOptions.map(result => <Select.Item minWidth={"full"} key={`select-${result}`} label={result} value={result} />)}
        </Select>
      </Box>
      <Box style={styles.inputBox}>
        <Text style={styles.inputLabel}>{t("LANDING_SCREEN.ACTIVE_DECK.RECORD_FORM.REMARKS")}</Text>
        <TextArea
          style={styles.input}
          marginTop={2}
          autoCompleteType
          h={75}
          value={matchRecord.remarks}
          onChangeText={text => matchRecordDispatch({ type: "UPDATE_REMARK", payload: text })}
        />
      </Box>
      <Box marginTop={3}>
        <Button style={styles.submitButton} onPress={handleRecordSubmission}>
          <Text style={styles.submitButtonText}>{t("LANDING_SCREEN.ACTIVE_DECK.RECORD_FORM.SUBMIT")}</Text>
        </Button>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "2%",
    paddingHorizontal: "4%",
    position: "relative",
    top: "-5%",
    width: "96%",
    zIndex: -1,
  },
  input: {
    backgroundColor: colors.white,
  },
  inputBox: {
    marginVertical: 2,
    position: "relative",
    zIndex: -1,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 2,
  },
  listSelect: {
    width: "100%",
  },
  submitButton: {
    alignSelf: "center",
    backgroundColor: colors.primary,
    width: "75%",
  },
  submitButtonText: {
    color: colors.white,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
