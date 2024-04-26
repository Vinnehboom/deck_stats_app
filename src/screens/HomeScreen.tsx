import React, { useContext } from "react";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/core";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { showMessage } from "react-native-flash-message";
import { StackNavigationProp } from "@react-navigation/stack";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons/faFolderOpen";
import { Platform } from "react-native";

import { AuthContext } from "../contexts/AuthContext";
import { MainTabParamList, RootStackParamList } from "../types/RouteParams";
import { Colors } from "../styles/variables";
import { LandingScreen } from "./Landing/LandingScreen";
import { DecksScreen } from "./decks/DecksScreen";
import { TabIcon } from "../components/layout/TabIcon";
import { TabBarStyle } from "../styles/layout/TabBarStyle";
import { Typography } from "../styles/variables/typography";
import { TranslationContext } from "../contexts/TranslationContext";

const Tab = createBottomTabNavigator<MainTabParamList>();

export const HomeScreen = () => {
  const user = auth().currentUser;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { t } = useContext(TranslationContext);

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
          tabBarInactiveTintColor: Colors.white,
          tabBarLabelStyle: TabBarStyle.label,
          tabBarActiveTintColor: Colors["primary-dark"],
          tabBarActiveBackgroundColor: Colors.light,
          headerTitle: t("HOME_SCREEN.HEADER_TITLE"),
          headerStyle: { backgroundColor: Colors["primary-dark"] },
          headerTitleStyle: {
            color: Colors["primary-dark"],
            fontSize: Typography.fontSizes.xxxl,
            fontWeight: "bold",
          },
        }}>
        <Tab.Screen
          name="Landing"
          options={{
            tabBarIcon: ({ focused }) => TabIcon(focused, faHouse),
            title: t("DECK.NAVIGATION.HOME.LANDING"),
            tabBarIconStyle: { display: Platform.OS === "ios" ? "flex" : "none" },
          }}
          component={LandingScreen}
        />
        <Tab.Screen
          name="Decks"
          options={{
            tabBarIcon: ({ focused }) => TabIcon(focused, faFolderOpen),
            title: t("DECK.NAVIGATION.HOME.DECKS"),
            tabBarIconStyle: { display: Platform.OS === "ios" ? "flex" : "none" },
          }}
          component={DecksScreen}
        />
      </Tab.Navigator>
    </AuthContext.Provider>
  );
};
