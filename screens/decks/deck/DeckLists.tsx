import React from "react";
import { View, ScrollView, Text } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import "react-native-get-random-values";
import { useTranslation } from "react-i18next";

import { Spinner } from "../../../components/Spinner";
import { DeckListTabParamList } from "../../../types/RouteParams";
import { useGetDeckLists } from "../../../components/lists/_queries/useGetDeckLists";
import { DeckListsStyle } from "../../../styles/decks/DeckListsStyle";
import { ListsScrollContainer } from "../../../components/lists/ListsScrollContainer";
import { ListCreationForm } from "../../../components/lists/ListCreationForm";
import { useGetActiveList } from "../../../components/lists/_queries/useGetActiveList";

export const DeckLists = () => {
  const { params } = useRoute<RouteProp<DeckListTabParamList, "DeckLists">>();
  const { deck } = params;
  const { t } = useTranslation();
  const { queryResult: lists, isLoading, isFetching } = useGetDeckLists(deck);
  const { queryResult: activeList, isLoading: activeListLoading, isFetching: activeListFetching } = useGetActiveList(deck);
  const activeListList = activeList?.list;

  const loading = isFetching || isLoading || activeListFetching || activeListLoading;
  if (loading) <Spinner />;

  return (
    <View style={DeckListsStyle.container}>
      <ScrollView style={DeckListsStyle.scrollViewContainer}>
        <ListCreationForm deck={deck} lists={lists} />
        <Text style={DeckListsStyle.listsTitle}> {t("DECK.DECK_LISTS.LISTS.TITLE")}</Text>
        {loading || !lists ? (
          <Spinner />
        ) : (
          <ListsScrollContainer deck={deck} lists={lists} loading={loading} activeList={activeListList} />
        )}
        <View />
      </ScrollView>
    </View>
  );
};
