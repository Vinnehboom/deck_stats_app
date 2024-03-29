import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RouteProp, useRoute } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
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

const Tab = createBottomTabNavigator<DeckListTabParamList>();

const InfoIcon = () => <FontAwesomeIcon color={colors["primary-dark"]} icon={faInfoCircle} />;
const TableIcon = () => <FontAwesomeIcon color={colors["primary-dark"]} icon={faTable} />;
const ListIcon = () => <FontAwesomeIcon color={colors["primary-dark"]} icon={faList} />;

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
        tabBarStyle: { backgroundColor: colors.light },
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
        options={{ tabBarIcon: () => InfoIcon(), title: t("DECK.NAVIGATION.DECKS.DETAILS") }}
        component={DeckDetails}
        initialParams={{ deck }}
      />
      <Tab.Screen
        name="DeckLists"
        options={{ tabBarIcon: () => ListIcon(), title: t("DECK.NAVIGATION.DECKS.LISTS") }}
        component={DeckLists}
        initialParams={{ deck }}
      />
      <Tab.Screen
        name="DeckMatchups"
        options={{ tabBarIcon: () => TableIcon(), title: t("DECK.NAVIGATION.DECKS.MATCHUPS") }}
        component={DeckMatchups}
        initialParams={{ deck }}
      />
    </Tab.Navigator>
  );
};

export { DeckHome };
