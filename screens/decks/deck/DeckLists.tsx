import React, { useState } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { showMessage } from "react-native-flash-message";
import { RouteProp, useRoute } from "@react-navigation/native";
import { v4 as uuidv4 } from "uuid";
import { Container, Input, TextArea } from "native-base";
import { useTranslation } from "react-i18next";
import "react-native-get-random-values";

import { transformList } from "../../../helpers/decklists";
import { Spinner } from "../../../components/Spinner";
import { List } from "../../../types";
import { DeckListTabParamsType } from "../../../types/RouteParams";
import { ListItem } from "../../../components/ListItem";
import { useListCreation } from "../../../components/lists/_queries/useListCreation";
import { useGetDeckLists } from "../../../components/lists/_queries/useGetDeckLists";
import { DeckListsStyle } from "../../../styles/decks/DeckListsStyle";

export const DeckLists = () => {
  const { params } = useRoute<RouteProp<DeckListTabParamsType, "Params">>();
  const { deck } = params;
  const { queryResult: lists, isLoading } = useGetDeckLists(deck);
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
  });

  const representLists = () => {
    return lists?.map((list: List) => <ListItem key={list.id} list={list} />);
  };

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

  if (isLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  } else {
    return (
      <Container style={DeckListsStyle.container}>
        <View style={DeckListsStyle.scrollContainer}>
          <ScrollView>
            <View style={DeckListsStyle.listForm}>
              <Text style={DeckListsStyle.title}> {t("DECK.DECK_LISTS.LIST_FORM.TITLE")}</Text>
              <Input
                editable
                placeholder={t("DECK.DECK_LISTS.LIST_FORM.NAME")}
                value={listName}
                onChangeText={text => setListName(text)}
                style={DeckListsStyle.formField}
              />
              <TextArea
                placeholder={t("DECK.DECK_LISTS.LIST_FORM.LIST_PLACEHOLDER")}
                autoCompleteType
                h={200}
                value={listString}
                onChangeText={text => setListString(text)}
                style={DeckListsStyle.formField}
              />
              <TouchableOpacity style={DeckListsStyle.button} onPress={handleListSubmission}>
                <Text style={DeckListsStyle.buttonText}>{t("DECK.DECK_LISTS.LIST_FORM.SUBMIT")}</Text>
              </TouchableOpacity>
            </View>
            <View style={DeckListsStyle.listsContainer}>{isLoading ? <Spinner /> : representLists()}</View>
            <View />
          </ScrollView>
        </View>
      </Container>
    );
  }
};
