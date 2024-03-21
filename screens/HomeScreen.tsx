import React from "react";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/core";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { showMessage } from "react-native-flash-message";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons/faFolderOpen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { AuthContext } from "../contexts/AuthContext";
import { MainTabParamList, RootStackParamList } from "../types/RouteParams";
import { colors } from "../utils/colors";
import { LandingScreen } from "./LandingScreen";
import { DecksScreen } from "./decks/DecksScreen";

const Tab = createBottomTabNavigator<MainTabParamList>();

const HouseIcon = () => <FontAwesomeIcon color={colors["primary-dark"]} icon={faHouse} />;
const FolderIcon = () => <FontAwesomeIcon color={colors["primary-dark"]} icon={faFolderOpen} />;

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
          tabBarStyle: { backgroundColor: colors.light },
          headerTitle: t("HOME_SCREEN.HEADER_TITLE"),
          headerStyle: { backgroundColor: colors["primary-dark"] },
          headerTitleStyle: {
            color: colors.white,
            fontSize: 24,
            fontWeight: "bold",
          },
        }}>
        <Tab.Screen name="Landing" options={{ tabBarIcon: () => HouseIcon() }} component={LandingScreen} />
        <Tab.Screen name="Decks" options={{ tabBarIcon: () => FolderIcon() }} component={DecksScreen} />
      </Tab.Navigator>
    </AuthContext.Provider>
  );
};
