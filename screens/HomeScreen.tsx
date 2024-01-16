import React from "react";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/core";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { showMessage } from "react-native-flash-message";
import { StackNavigationProp } from "@react-navigation/stack";

import { AuthContext } from "../contexts/AuthContext";
import { MainTabParamList, RootStackParamList } from "../types/RouteParams";
import { colors } from "../utils/colors";
import { LandingScreen } from "./LandingScreen";
import { DecklistScreen } from "./decklists/DecklistScreen";

const Tab = createBottomTabNavigator<MainTabParamList>();

export const HomeScreen = () => {
  const user = auth().currentUser;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const handleSignOut = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.replace("Login", undefined);
      })
      .catch(error => {
        showMessage({
          message: `${error.message}`,
          type: "warning",
        });
      });
  };

  const authProviderValue = {
    user: user,
    signOut: handleSignOut,
  };

  return (
    <AuthContext.Provider value={authProviderValue}>
      <Tab.Navigator
        initialRouteName="Decks"
        screenOptions={{
          headerTitle: "VS. Recorder",
          headerStyle: { backgroundColor: colors["primary-dark"] },
          headerTitleStyle: {
            color: colors.white,
            fontSize: 24,
            fontWeight: "bold",
          },
        }}>
        <Tab.Screen name="Landing" component={LandingScreen} />
        <Tab.Screen name="Decks" component={DecklistScreen} />
      </Tab.Navigator>
    </AuthContext.Provider>
  );
};
