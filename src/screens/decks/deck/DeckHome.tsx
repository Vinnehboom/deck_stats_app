import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RouteProp, useRoute } from "@react-navigation/native";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons/faInfoCircle";
import { faTable } from "@fortawesome/free-solid-svg-icons/faTable";
import { faList } from "@fortawesome/free-solid-svg-icons/faList";
import { useTranslation } from "react-i18next";

import { DeckListTabParamList, DeckListTabParamsType } from "../../../types/RouteParams";
import { colors } from "../../../utils/colors";
import { DeckMatchups } from "./DeckMatchups";
import { DeckLists } from "./DeckLists";
import { DeckDetails } from "./DeckDetails";
import { Spinner } from "../../../components/Spinner";
import { useGetDeck } from "../../../components/decks/_queries/useGetDeck";
import { HeaderBackButton } from "../../../components/navigation/HeaderBackButton";
import { DeckScreenTitle } from "../../../components/decks/DeckScreenTitle";
import { TabBarStyle } from "../../../styles/layout/TabBarStyle";
import { TabIcon } from "../../../components/layout/TabIcon";
const Tab = createBottomTabNavigator<DeckListTabParamList>();

const DeckHome = () => {
  const { params } = useRoute<RouteProp<DeckListTabParamsType, "Params">>();
  const { deckId } = params;
  const { queryResult: deck, isLoading } = useGetDeck(deckId);
  const { t } = useTranslation();

  return isLoading ? (
    <Spinner />
  ) : (
    <Tab.Navigator
      initialRouteName="DeckDetails"
      screenOptions={{
        headerTitle: () => DeckScreenTitle({ deck }),
        headerLeft: HeaderBackButton,
        headerStyle: { backgroundColor: colors.primary },
        tabBarStyle: TabBarStyle.bar,
        tabBarItemStyle: TabBarStyle.item,
        tabBarInactiveTintColor: colors["primary-dark"],
        tabBarLabelStyle: TabBarStyle.label,
        tabBarActiveTintColor: colors.white,
        tabBarActiveBackgroundColor: colors.light,
        headerShadowVisible: true,
        headerLeftContainerStyle: { paddingStart: 15 },
        headerTitleStyle: {
          color: colors.white,
          fontSize: 18,
          fontWeight: "bold",
        },
      }}>
      <Tab.Screen
        name="DeckDetails"
        options={{ tabBarIcon: ({ focused }) => TabIcon(focused, faInfoCircle), title: t("DECK.NAVIGATION.DECKS.DETAILS") }}
        component={DeckDetails}
        initialParams={{ deck }}
      />
      <Tab.Screen
        name="DeckLists"
        options={{ tabBarIcon: ({ focused }) => TabIcon(focused, faList), title: t("DECK.NAVIGATION.DECKS.LISTS") }}
        component={DeckLists}
        initialParams={{ deck }}
      />
      <Tab.Screen
        name="DeckMatchups"
        options={{ tabBarIcon: ({ focused }) => TabIcon(focused, faTable), title: t("DECK.NAVIGATION.DECKS.MATCHUPS") }}
        component={DeckMatchups}
        initialParams={{ deck }}
      />
    </Tab.Navigator>
  );
};

export { DeckHome };
