import { View, TouchableOpacity } from "react-native";
import React, { useReducer } from "react";
import { showMessage } from "react-native-flash-message";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import { Input, TextArea, Checkbox, Box } from "native-base";

import { Text } from "../../components/layout/Text";
import { ListFormStyle } from "../../styles/lists/ListFormStyle";
import { useListCreation } from "./_queries/useListCreation";
import { Deck, List } from "../../types";
import { transformList } from "../../helpers/decklists";

type newListStateType = { listString: string; listName: string; activate: "0" | "1" };
const listStringReducer = (
  state: newListStateType,
  action: { type: "setListString" | "setListName" | "clear" | "updateActivate"; payload?: string }
): newListStateType => {
  switch (action.type) {
    case "clear": {
      return { listName: "", listString: "", activate: "0" };
    }
    case "setListString": {
      return action.payload !== undefined ? { ...state, listString: action.payload } : { ...state };
    }
    case "setListName": {
      return action.payload !== undefined ? { ...state, listName: action.payload } : { ...state };
    }
    case "updateActivate": {
      return action.payload === "0" || action.payload === "1" ? { ...state, activate: action.payload } : { ...state };
    }
  }
};

export const ListCreationForm = ({ deck, lists }: { deck: Deck; lists: List[] }) => {
  const [newListObject, newListObjectDispatch] = useReducer(listStringReducer, { listString: "", listName: "", activate: "0" });
  const { t } = useTranslation();

  const listCreationMutation = useListCreation(deck, (activated?: boolean) => {
    const flashMessage = activated
      ? t("DECK.DECK_LISTS.LIST_CREATION.SUCCESS_AND_ACTIVATED")
      : t("DECK.DECK_LISTS.LIST_CREATION.SUCCESS");
    showMessage({
      message: flashMessage,
      type: "info",
    });
    newListObjectDispatch({ type: "clear" });
  });

  const handleListSubmission = () => {
    const [cardList, errors] = transformList(newListObject.listString);
    const list: List = {
      name: newListObject.listName,
      id: uuidv4(),
      deckId: deck.id,
      cards: cardList,
    };
    if (errors.length > 0) {
      const errorString = errors.join(", ");
      showMessage({
        message: `${t("DECK.DECK_LISTS.LIST_CREATION.ERROR")} ${errorString}`,
        type: "warning",
      });
    } else {
      const activateList = newListObject.activate === "1" || !lists || lists?.length < 1;
      listCreationMutation.mutate({ list: list, setActive: activateList });
    }
  };
  return (
    <View style={ListFormStyle.listForm}>
      <Text style={ListFormStyle.title}> {t("DECK.DECK_LISTS.LIST_FORM.TITLE")}</Text>
      <Box width="100%">
        <Text style={ListFormStyle.inputLabel}>{t("DECK.DECK_LISTS.LIST_FORM.NAME")}</Text>
        <Input
          value={newListObject.listName}
          onChangeText={(text: string) => newListObjectDispatch({ type: "setListName", payload: text })}
          style={ListFormStyle.formField}
        />
      </Box>

      <Box width="100%">
        <Text style={ListFormStyle.inputLabel}>{t("DECK.DECK_LISTS.LIST_FORM.LIST_PLACEHOLDER")}</Text>
        <TextArea
          autoCompleteType
          h={200}
          value={newListObject.listString}
          onChangeText={text => newListObjectDispatch({ type: "setListString", payload: text })}
          style={ListFormStyle.formField}
        />
      </Box>

      <Checkbox
        marginTop={4}
        value={newListObject.activate}
        isChecked={newListObject.activate === "1"}
        onChange={value => newListObjectDispatch({ type: "updateActivate", payload: value ? "1" : "0" })}>
        <Text> Set active </Text>
      </Checkbox>
      <TouchableOpacity style={ListFormStyle.button} onPress={handleListSubmission}>
        <Text style={ListFormStyle.buttonText}>{t("DECK.DECK_LISTS.LIST_FORM.SUBMIT")}</Text>
      </TouchableOpacity>
    </View>
  );
};
