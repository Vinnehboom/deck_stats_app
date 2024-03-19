import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RouteProp, useRoute } from "@react-navigation/native";

import { DeckListTabParamList, DeckListTabParamsType } from "../../../types/RouteParams";
import { colors } from "../../../utils/colors";
import { DeckMatchups } from "./DeckMatchups";
import { DeckLists } from "./DeckLists";
import { DeckDetails } from "./DeckDetails";
import { Spinner } from "../../../components/Spinner";
import { useGetDeck } from "../../../components/decks/_queries/useGetDeck";
import { HeaderBackButton } from "../../../components/navigation/HeaderBackButton";

const Tab = createBottomTabNavigator<DeckListTabParamList>();

const DeckHome = () => {
  const { params } = useRoute<RouteProp<DeckListTabParamsType, "Params">>();
  const { deckId } = params;
  const { queryResult: deck, isLoading } = useGetDeck(deckId);

  return isLoading ? (
    <Spinner />
  ) : (
    <Tab.Navigator
      initialRouteName="DeckDetails"
      screenOptions={{
        headerTitle: deck.name,
        headerLeft: HeaderBackButton,
        headerStyle: { backgroundColor: colors.primary },
        headerShadowVisible: true,
        headerLeftContainerStyle: { paddingStart: 15 },
        headerTitleStyle: {
          color: colors.white,
          fontSize: 18,
          fontWeight: "bold",
        },
      }}>
      <Tab.Screen name="DeckDetails" component={DeckDetails} initialParams={{ deck }} />
      <Tab.Screen name="DeckLists" component={DeckLists} initialParams={{ deck }} />
      <Tab.Screen name="DeckMatchups" component={DeckMatchups} initialParams={{ deck }} />
    </Tab.Navigator>
  );
};

export { DeckHome };
