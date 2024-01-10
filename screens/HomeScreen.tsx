import React from "react"
import auth from "@react-native-firebase/auth"
import { useNavigation } from "@react-navigation/core"
import DecklistScreen from "./decklists/DecklistScreen"
import LandingScreen from "./LandingScreen"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import AuthContext from "../contexts/AuthContext"
import { showMessage } from "react-native-flash-message"
import { MainTabParamList, RootStackParamList } from "../types/RouteParams"
import { StackNavigationProp } from "@react-navigation/stack"

const Tab = createBottomTabNavigator<MainTabParamList>()
const HomeScreen = () => {
  const user = auth().currentUser
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const handleSignOut = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.replace("Login", undefined)
      })
      .catch(error => {
        showMessage({
          message: `${error.message}`,
          type: "warning",
        })
      })
  }

  const authProviderValue = {
    user: user,
    signOut: handleSignOut,
  }

  return (
    <AuthContext.Provider value={authProviderValue}>
      <Tab.Navigator
        initialRouteName="Decklist"
        screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Landing" component={LandingScreen} />
        <Tab.Screen name="Decklist" component={DecklistScreen} />
      </Tab.Navigator>
    </AuthContext.Provider>
  )
}

export default HomeScreen
