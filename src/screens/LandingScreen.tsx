import React from "react";
import { TouchableOpacity, View, Image } from "react-native";
import { useTranslation } from "react-i18next";
import { ScrollView, Box } from "native-base";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAvoidingView } from "react-native";

import { Text } from "../components/layout/Text";
import { useGetActiveDeck } from "../components/decks/_queries/useGetActiveDeck";
import { useAuthContext } from "../contexts/useAuthContext";
import { LandingScreenStyle } from "../styles/LandingScreenStyle";
import { Spinner } from "../components/Spinner";
import { ActiveDeck } from "../components/decks/ActiveDeck";
import { DeckMatchHistory } from "../components/decks/DeckMatchHistory";
import { MainTabParamList } from "../types/RouteParams";

export const LandingScreen = () => {
  const { signOut } = useAuthContext();
  const user = auth().currentUser;
  const { t } = useTranslation();
  const { navigate } = useNavigation<MainTabParamList>();

  const { queryResult: activeDeck, isLoading, isFetching } = useGetActiveDeck(user!);
  const deck = activeDeck?.deck;

  return (
    <View style={LandingScreenStyle.container}>
      <ScrollView>
        <Image style={LandingScreenStyle.logo} source={require("../assets/images/logo_light_no_bg_500.png")} />
        <Text style={LandingScreenStyle.welcome}>Welcome back, trainer!</Text>
        {isLoading || isFetching ? (
          <Spinner />
        ) : (
          <Box>
            {deck ? (
              <KeyboardAvoidingView behavior="position" enabled={true}>
                <ActiveDeck deck={deck} />
                <Box style={LandingScreenStyle.recentRecordsContainer}>
                  <Text style={LandingScreenStyle.recentRecordsTitle}>
                    {t("LANDING_SCREEN.ACTIVE_DECK.RECORD_FORM.RECENT_RECORDS")}
                  </Text>
                  <DeckMatchHistory deck={deck} limit={3} />
                </Box>
              </KeyboardAvoidingView>
            ) : (
              <Text style={LandingScreenStyle.setActiveDeckText}>
                Please add an active deck on the{" "}
                <Text style={LandingScreenStyle.setActiveDeckLink} onPress={() => navigate("Decks", undefined)}>
                  Decks
                </Text>{" "}
                tab
              </Text>
            )}
          </Box>
        )}

        <TouchableOpacity onPress={signOut} style={LandingScreenStyle.button}>
          <Text style={LandingScreenStyle.buttonText}> {t("LANDING_SCREEN.SIGN_OUT")} </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
