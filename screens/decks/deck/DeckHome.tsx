import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { ArrowBackIcon, Button } from "native-base";
import { Text } from "react-native";
import { useTranslation } from "react-i18next";

import { DeckListTabParamList, DeckListTabParamsType, MainTabParamList } from "../../../types/RouteParams";
import { colors } from "../../../utils/colors";
import { DeckMatchups } from "./DeckMatchups";
import { DeckLists } from "./DeckLists";
import { DeckDetails } from "./DeckDetails";
import { Spinner } from "../../../components/Spinner";
import { useGetDeck } from "../../../components/decks/_queries/useGetDeck";

const Tab = createBottomTabNavigator<DeckListTabParamList>();

const DeckHome = () => {
  const { t } = useTranslation();
  const { params } = useRoute<RouteProp<DeckListTabParamsType, "Params">>();
  const { deckId } = params;
  const { queryResult: deck, isLoading } = useGetDeck(deckId);
  const { navigate } = useNavigation<StackNavigationProp<MainTabParamList>>();
  const headerBackButton = () => (
    <Button colorScheme={"white"} fontWeight={"bold"} onPress={() => navigate("Decks")} startIcon={<ArrowBackIcon />}>
      <Text>{t("DECK.NAVIGATION.BACK")}</Text>
    </Button>
  );

  return isLoading ? (
    <Spinner />
  ) : (
    <Tab.Navigator
      initialRouteName="DeckDetails"
      screenOptions={{
        headerTitle: deck.name,
        headerLeft: headerBackButton,
        headerStyle: { backgroundColor: colors.primary },
        headerTitleStyle: {
          color: colors.dark,
          fontSize: 18,
          fontWeight: "bold",
        },
      }}>
      <Tab.Screen name="DeckDetails" component={DeckDetails} initialParams={{ deck: deck }} />
      <Tab.Screen name="DeckLists" component={DeckLists} initialParams={{ deck: deck }} />
      <Tab.Screen name="DeckMatchups" component={DeckMatchups} initialParams={{ deck: deck }} />
    </Tab.Navigator>
  );
};

export { DeckHome };
