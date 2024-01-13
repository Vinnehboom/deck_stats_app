import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { ArrowBackIcon, Button } from "native-base";
import { Text } from "react-native";

import { DeckListTabParamList, DeckListTabParamsType, MainTabParamList } from "../../../types/RouteParams";
import { colors } from "../../../utils/colors";
import DecklistMatchups from "./DecklistMatchups";
import DecklistList from "./DecklistList";
import DecklistDetails from "./DecklistDetails";

const Tab = createBottomTabNavigator<DeckListTabParamList>();

const DecklistHome = () => {
  const { params } = useRoute<RouteProp<DeckListTabParamsType, "Params">>();
  const { deck } = params;
  const { navigate } = useNavigation<StackNavigationProp<MainTabParamList>>();
  const headerBackButton = () => (
    <Button colorScheme={"white"} fontWeight={"bold"} onPress={() => navigate("Decks")} startIcon={<ArrowBackIcon />}>
      <Text>Decks</Text>
    </Button>
  );

  return (
    <Tab.Navigator
      initialRouteName="DecklistDetails"
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
      <Tab.Screen name="DecklistDetails" component={DecklistDetails} initialParams={{ deck: deck }} />
      <Tab.Screen name="DecklistList" component={DecklistList} initialParams={{ deck: deck }} />
      <Tab.Screen name="DecklistMatchups" component={DecklistMatchups} initialParams={{ deck: deck }} />
    </Tab.Navigator>
  );
};

export { DecklistHome };
