import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import DecklistDetails from "./DecklistDetails"
import DecklistList from "./DecklistList"
import DecklistMatchups from "./DecklistMatchups"
import { RouteProp, useRoute } from "@react-navigation/native"
import {
  DeckListTabParamList,
  DeckListTabParamsType,
} from "../../../types/RouteParams"

const Tab = createBottomTabNavigator<DeckListTabParamList>()

const DecklistHome = () => {
  const { params } = useRoute<RouteProp<DeckListTabParamsType, "Params">>()
  const { deck } = params

  return (
    <Tab.Navigator
      initialRouteName="DecklistDetails"
      screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="DecklistDetails"
        component={DecklistDetails}
        initialParams={{ deck: deck }}
      />
      <Tab.Screen
        name="DecklistList"
        component={DecklistList}
        initialParams={{ deck: deck }}
      />
      <Tab.Screen
        name="DecklistMatchups"
        component={DecklistMatchups}
        initialParams={{ deck: deck }}
      />
    </Tab.Navigator>
  )
}

export { DecklistHome }
