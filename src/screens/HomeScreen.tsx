import React from "react";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/core";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { showMessage } from "react-native-flash-message";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons/faFolderOpen";

import { AuthContext } from "../contexts/AuthContext";
import { MainTabParamList, RootStackParamList } from "../types/RouteParams";
import { Colors } from "../styles/variables";
import { LandingScreen } from "./LandingScreen";
import { DecksScreen } from "./decks/DecksScreen";
import { TabIcon } from "../components/layout/TabIcon";
import { TabBarStyle } from "../styles/layout/TabBarStyle";
import { Typography } from "../styles/variables/typography";

const Tab = createBottomTabNavigator<MainTabParamList>();

export const HomeScreen = () => {
  const user = auth().currentUser;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();

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
        initialRouteName="Landing"
        screenOptions={{
          headerShown: false,
          tabBarStyle: TabBarStyle.bar,
          tabBarItemStyle: TabBarStyle.item,
          tabBarInactiveTintColor: Colors["primary-dark"],
          tabBarLabelStyle: TabBarStyle.label,
          tabBarActiveTintColor: Colors.white,
          tabBarActiveBackgroundColor: Colors.light,
          headerTitle: t("HOME_SCREEN.HEADER_TITLE"),
          headerStyle: { backgroundColor: Colors["primary-dark"] },
          headerTitleStyle: {
            color: Colors.white,
            fontSize: Typography.fontSizes.xxxl,
            fontWeight: "bold",
          },
        }}>
        <Tab.Screen
          name="Landing"
          options={{
            tabBarIcon: ({ focused }) => TabIcon(focused, faHouse),
            title: t("DECK.NAVIGATION.HOME.LANDING"),
          }}
          component={LandingScreen}
        />
        <Tab.Screen
          name="Decks"
          options={{ tabBarIcon: ({ focused }) => TabIcon(focused, faFolderOpen), title: t("DECK.NAVIGATION.HOME.DECKS") }}
          component={DecksScreen}
        />
      </Tab.Navigator>
    </AuthContext.Provider>
  );
};
