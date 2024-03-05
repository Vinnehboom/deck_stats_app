import React from "react";
import { View, ScrollView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import "react-native-get-random-values";

import { Spinner } from "../../../components/Spinner";
import { DeckListTabParamList } from "../../../types/RouteParams";
import { useGetDeckLists } from "../../../components/lists/_queries/useGetDeckLists";
import { DeckListsStyle } from "../../../styles/decks/DeckListsStyle";
import { ListsScrollContainer } from "../../../components/lists/ListsScrollContainer";
import { ListCreationForm } from "../../../components/lists/ListCreationForm";

export const DeckLists = () => {
  const { params } = useRoute<RouteProp<DeckListTabParamList, "DeckLists">>();
  const { deck } = params;
  const { queryResult: lists, isLoading } = useGetDeckLists(deck);

  if (isLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  } else {
    return (
      <View style={DeckListsStyle.container}>
        <ScrollView style={DeckListsStyle.scrollViewContainer}>
          <ListCreationForm deck={deck} lists={lists} />
          {isLoading || !lists ? <Spinner /> : <ListsScrollContainer lists={lists} />}
          <View />
        </ScrollView>
      </View>
    );
  }
};
