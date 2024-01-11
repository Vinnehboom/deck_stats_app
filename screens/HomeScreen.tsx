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
import { colors } from "../utils/colors"

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
        <Tab.Screen
          name="Decks"
          options={{ animation: "fade" }}
          component={DecklistScreen}
        />
      </Tab.Navigator>
    </AuthContext.Provider>
  )
}

export default HomeScreen
