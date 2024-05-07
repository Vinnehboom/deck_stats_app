import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider, extendTheme } from "native-base";
import FlashMessage from "react-native-flash-message";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import BootSplash from "react-native-bootsplash";

import { Colors, Typography } from "./styles/variables";
import { LoginScreen } from "./screens/LoginScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { DeckHome } from "./screens/decks/deck/DeckHome";
import { RootStackParamList } from "./types/RouteParams";
import { MatchupNotes } from "./screens/matchups/MatchupNotes";
import { HeaderBackButton } from "./components/navigation/HeaderBackButton";
import "./utils/i18n";
import { TranslationContext } from "./contexts/TranslationContext";
import { MatchExport } from "./screens/exports/MatchExport";
const Stack = createNativeStackNavigator<RootStackParamList>();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      gcTime: 10 * 10 * 6000,
    },
  },
});

export function App(): JSX.Element {
  const { t } = useTranslation();
  const TranslationContextValue = { t };
  const theme = extendTheme({
    colors: {
      primary: {
        50: "#ecf1f8",
        100: "#c7d6ea",
        200: "#a2bbdc",
      },
    },
  });

  useEffect(() => {
    BootSplash.hide({ fade: true });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TranslationContext.Provider value={TranslationContextValue}>
        <NativeBaseProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ contentStyle: { backgroundColor: Colors.white } }}>
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
                  headerTitleStyle: { color: Colors.white, fontSize: Typography.fontSizes.lg, fontWeight: "bold" },
                  headerStyle: { backgroundColor: Colors.primary },
                  headerShadowVisible: true,
                }}
                component={MatchupNotes}
              />
              <Stack.Screen
                name="MatchExport"
                options={{
                  animation: "fade",
                  headerLeft: HeaderBackButton,
                  headerShown: true,
                  headerTitle: t("MATCH_EXPORT.SCREEN_TITLE"),
                  headerTitleStyle: { color: Colors.white, fontSize: Typography.fontSizes.lg, fontWeight: "bold" },
                  headerStyle: { backgroundColor: Colors.primary },
                  headerShadowVisible: true,
                }}
                component={MatchExport}
              />
            </Stack.Navigator>
            <FlashMessage position="top" />
          </NavigationContainer>
        </NativeBaseProvider>
      </TranslationContext.Provider>
    </QueryClientProvider>
  );
}
