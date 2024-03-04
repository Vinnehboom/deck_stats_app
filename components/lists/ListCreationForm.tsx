import { Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { showMessage } from "react-native-flash-message";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import { Input, TextArea } from "native-base";

import { ListFormStyle } from "../../styles/lists/ListFormStyle";
import { useListCreation } from "./_queries/useListCreation";
import { Deck, List } from "../../types";
import { transformList } from "../../helpers/decklists";

export const ListCreationForm = ({ deck, lists }: { deck: Deck; lists: List[] }) => {
  const [listString, setListString] = useState("");
  const [listName, setListName] = useState("");
  const { t } = useTranslation();

  const listCreationMutation = useListCreation(deck, (activated?: boolean) => {
    const flashMessage = activated
      ? t("DECK.DECK_LISTS.LIST_CREATION.SUCCESS_AND_ACTIVATED")
      : t("DECK.DECK_LISTS.LIST_CREATION.SUCCESS");
    showMessage({
      message: flashMessage,
      type: "info",
    });

    setListString("");
    setListName("");
  });

  const handleListSubmission = () => {
    const [cardList, errors] = transformList(listString);
    const list: List = {
      name: listName,
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
      listCreationMutation.mutate({ list: list, setActive: !lists || lists?.length < 1 });
    }
  };
  return (
    <View style={ListFormStyle.listForm}>
      <Text style={ListFormStyle.title}> {t("DECK.DECK_LISTS.LIST_FORM.TITLE")}</Text>
      <Input
        placeholder={t("DECK.DECK_LISTS.LIST_FORM.NAME")}
        value={listName}
        onChangeText={(text: string) => setListName(text)}
        style={ListFormStyle.formField}
      />
      <TextArea
        marginTop={5}
        placeholder={t("DECK.DECK_LISTS.LIST_FORM.LIST_PLACEHOLDER")}
        autoCompleteType
        h={200}
        value={listString}
        onChangeText={text => setListString(text)}
        style={ListFormStyle.formField}
      />
      <TouchableOpacity style={ListFormStyle.button} onPress={handleListSubmission}>
        <Text style={ListFormStyle.buttonText}>{t("DECK.DECK_LISTS.LIST_FORM.SUBMIT")}</Text>
      </TouchableOpacity>
    </View>
  );
};
