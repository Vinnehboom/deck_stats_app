import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import DeckContext from "../../../contexts/DeckContext"
import DecklistDetails from "./DecklistDetails"
import DecklistList from "./DecklistList"
import DecklistMatchups from "./DecklistMatchups"
import FlashMessage from "react-native-flash-message"

const Tab = createBottomTabNavigator()

const DecklistHome = params => {
  let props = params.route.params
  let { deck } = props
  const deckContextValue = {
    deck: deck,
  }

  return (
    <DeckContext.Provider value={deckContextValue}>
      <Tab.Navigator
        initialRouteName="DeckDetails"
        screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="DeckDetails"
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
    </DeckContext.Provider>
  )
}

export default DecklistHome
