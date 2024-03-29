import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider, extendTheme } from "native-base";
import FlashMessage from "react-native-flash-message";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { colors } from "./utils/colors";
import { LoginScreen } from "./screens/LoginScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { DeckHome } from "./screens/decks/deck/DeckHome";
import { RootStackParamList } from "./types/RouteParams";
import { MatchupNotes } from "./screens/matchups/MatchupNotes";
import { HeaderBackButton } from "./components/navigation/HeaderBackButton";
import "./utils/i18n";
const Stack = createNativeStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();

export function App(): JSX.Element {
  const { t } = useTranslation();
  const theme = extendTheme({
    colors: {
      primary: {
        50: "#ecf1f8",
        100: "#c7d6ea",
        200: "#a2bbdc",
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ contentStyle: { backgroundColor: colors.white } }}>
            <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
            <Stack.Screen name="DecklistHome" options={{ animation: "fade", headerShown: false }} component={DeckHome} />
            <Stack.Screen
              name="MatchupNotes"
              options={{
                animation: "fade",
                headerLeft: HeaderBackButton,
                headerShown: true,
                headerTitle: t("MATCHUP_NOTES.SCREEN_TITLE"),
                headerTitleStyle: { color: colors.white, fontSize: 16, fontWeight: "bold" },
                headerStyle: { backgroundColor: colors.primary },
                headerShadowVisible: true,
              }}
              component={MatchupNotes}
            />
          </Stack.Navigator>
          <FlashMessage position="top" />
        </NavigationContainer>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}
