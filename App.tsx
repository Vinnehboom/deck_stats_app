import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import FlashMessage from "react-native-flash-message";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { LoginScreen } from "./screens/LoginScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { DecklistHome } from "./screens/decklists/decklist/DecklistHome";
import { RootStackParamList } from "./types/RouteParams";

const Stack = createNativeStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();
export function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
            <Stack.Screen name="DecklistHome" options={{ animation: "fade", headerShown: false }} component={DecklistHome} />
          </Stack.Navigator>
          <FlashMessage position="top" />
        </NavigationContainer>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}
