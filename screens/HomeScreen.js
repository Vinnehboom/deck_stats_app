import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../utils/colors";
import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/core";
import DecklistScreen from "./DecklistScreen";
import LandingScreen from "./LandingScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FlashMessage from "react-native-flash-message";

const Tab = createBottomTabNavigator();
const HomeScreen = () => {

  const user = auth().currentUser;

  const navigation = useNavigation();
  const handleSignOut = () => {
    auth()
      .signOut()
      .then(() => {navigation.replace('Login');})
      .catch(error => alert(error.message));
  };

  return(
    <>
      <FlashMessage position="top" />
      <Tab.Navigator initialRouteName="Home" screenOptions={ { headerShown: false} }>
        <Tab.Screen name="Landing" component={LandingScreen} />
        <Tab.Screen name="Decklist" component={DecklistScreen} />
      </Tab.Navigator>
    </>

  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  button: {
    marginTop: 40,
    backgroundColor: colors.darkBlue,
    width: '60%',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
})
