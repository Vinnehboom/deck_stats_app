import React from "react";
import { View, ScrollView, KeyboardAvoidingView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import "react-native-get-random-values";
import { useTranslation } from "react-i18next";

import { Spinner } from "../../../components/Spinner";
import { DeckListTabParamList } from "../../../types/RouteParams";
import { useGetDeckLists } from "../../../components/lists/_queries/useGetDeckLists";
import { ListsScrollContainer } from "../../../components/lists/ListsScrollContainer";
import { ListCreationForm } from "../../../components/lists/ListCreationForm";
import { useGetActiveList } from "../../../components/lists/_queries/useGetActiveList";
import { ScrollableScreenStyle } from "../../../styles/layout/ScrollableScreenStyle";
import { Header } from "../../../components/layout/Header";

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
    <View style={ScrollableScreenStyle.container}>
      <ScrollView style={ScrollableScreenStyle.scrollViewContainer}>
        <KeyboardAvoidingView behavior="position" enabled={true} keyboardVerticalOffset={50}>
          <ListCreationForm deck={deck} lists={lists} />
        </KeyboardAvoidingView>
        <Header header="h2">{t("DECK.DECK_LISTS.LISTS.TITLE")}</Header>
        {loading || !lists ? (
          <Spinner description={t("DECK.DECK_LISTS.LISTS.LOADING")} />
        ) : (
          <ListsScrollContainer deck={deck} lists={lists} loading={loading} activeList={activeListList} />
        )}
        <View />
      </ScrollView>
    </View>
  );
};
