import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { showMessage } from "react-native-flash-message";
import { RouteProp, useRoute } from "@react-navigation/native";
import { v4 as uuidv4 } from "uuid";
import { Container, Input, TextArea } from "native-base";
import { useTranslation } from "react-i18next";
import "react-native-get-random-values";

import { colors } from "../../../utils/colors";
import { transformList } from "../../../helpers/decklists";
import { Spinner } from "../../../components/Spinner";
import { List } from "../../../types";
import { DeckListTabParamsType } from "../../../types/RouteParams";
import { ListItem } from "../../../components/ListItem";
import { useListCreation } from "../../../components/lists/_queries/useListCreation";
import { useGetDeckLists } from "../../../components/lists/_queries/useGetDeckLists";

export const DeckLists = () => {
  const { params } = useRoute<RouteProp<DeckListTabParamsType, "Params">>();
  const { deck } = params;
  const { queryResult: lists, isLoading } = useGetDeckLists(deck);
  const [listString, setListString] = useState("");
  const [listName, setListName] = useState("");
  const { t } = useTranslation();

  const listCreationMutation = useListCreation(deck, () => {
    showMessage({
      message: t("DECK.DECK_LISTS.LIST_CREATION.SUCCESS"),
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
      listCreationMutation.mutate(list);
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
      <Container style={styles.container}>
        <View style={styles.scrollContainer}>
          <ScrollView>
            <View style={styles.listForm}>
              <Text style={styles.title}> {t("DECK.DECK_LISTS.LIST_FORM.TITLE")}</Text>
              <Input
                editable
                placeholder={t("DECK.DECK_LISTS.LIST_FORM.NAME")}
                value={listName}
                onChangeText={text => setListName(text)}
                style={styles.listForm.formField}
              />
              <TextArea
                placeholder={t("DECK.DECK_LISTS.LIST_FORM.LIST_PLACEHOLDER")}
                autoCompleteType
                h={200}
                value={listString}
                onChangeText={text => setListString(text)}
                style={styles.listForm.formField}
              />
              <TouchableOpacity style={styles.button} onPress={handleListSubmission}>
                <Text style={styles.buttonText}>{t("DECK.DECK_LISTS.LIST_FORM.SUBMIT")}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.listsContainer}>{isLoading ? <Spinner /> : representLists()}</View>
            <View />
          </ScrollView>
        </View>
      </Container>
    );
  }
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.darkBlue,
    borderRadius: 10,
    marginTop: 20,
    padding: 10,
    width: "auto",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    minWidth: "100%",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  listForm: {
    alignItems: "center",
    formField: {
      minWidth: "100%",
      backgroundColor: "white",
      paddingHorizontal: 5,
      paddingVertical: 5,
      borderRadius: 5,
      fontSize: 16,
      height: "80%",
    },
    marginBottom: -50,
    minHeight: "45%",
    minWidth: "100%",
  },
  listsContainer: { width: "80%" },
  scrollContainer: { flexShrink: 1 },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginVertical: 5,
    textAlign: "center",
  },
});
