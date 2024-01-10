import React from "react"
import LoginScreen from "./screens/LoginScreen"
import HomeScreen from "./screens/HomeScreen"
import { DecklistHome } from "./screens/decklists/decklist/DecklistHome"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { RootStackParamList } from "./types/RouteParams"

import FlashMessage from "react-native-flash-message"

const Stack = createNativeStackNavigator<RootStackParamList>()

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen name="DecklistHome" component={DecklistHome} />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  )
}

export default App
