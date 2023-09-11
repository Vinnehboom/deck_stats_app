import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DecklistDetails from "./DecklistDetails";
import DecklistList from "./DecklistList";
import DecklistMatchups from "./DecklistMatchups";
import FlashMessage from "react-native-flash-message";

const Tab = createBottomTabNavigator();

const DecklistHome = (params) => {
  let props = params["route"]["params"];
  let { deck } = props;

  return(
    <>
    <FlashMessage position="top" />
    <Tab.Navigator initialRouteName="DeckDetails" screenOptions={ { headerShown: false} }>
        <Tab.Screen name="DeckDetails" component={DecklistDetails} initialParams={{ deck: deck }}/>
        <Tab.Screen name="DecklistList" component={DecklistList} initialParams={{ deck: deck }}/>
        <Tab.Screen name="DecklistMatchups" component={DecklistMatchups} initialParams={{ deck: deck }}/>
      </Tab.Navigator>
    </>
  );
};

export default DecklistHome;
