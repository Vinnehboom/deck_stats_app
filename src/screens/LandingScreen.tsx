import React from "react";
import { View, Image } from "react-native";
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
import { Button } from "../components/layout/Button";
import { Colors } from "../styles/variables";
import { Header } from "../components/layout/Header";

export const LandingScreen = () => {
  const { signOut } = useAuthContext();
  const user = auth().currentUser;
  const { t } = useTranslation();
  const { navigate } = useNavigation<MainTabParamList>();

  const { queryResult: activeDeck, isLoading } = useGetActiveDeck(user!);
  const deck = activeDeck?.deck;

  return (
    <View style={LandingScreenStyle.container}>
      <ScrollView>
        <Image style={LandingScreenStyle.logo} source={require("../assets/images/logo_light_no_bg_500.png")} />
        <Text style={LandingScreenStyle.welcome}>Welcome back, trainer!</Text>
        {isLoading ? (
          <Spinner />
        ) : (
          <Box>
            {deck ? (
              <KeyboardAvoidingView behavior="position" enabled={true}>
                <ActiveDeck deck={deck} />
                <Box style={LandingScreenStyle.recentRecordsContainer}>
                  <Header header="h2">{t("LANDING_SCREEN.ACTIVE_DECK.RECORD_FORM.RECENT_RECORDS")}</Header>
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
        <Button
          marginY={5}
          text={t("LANDING_SCREEN.SIGN_OUT")}
          width="auto"
          alignSelf="center"
          onPress={signOut}
          color={Colors.red}
        />
      </ScrollView>
    </View>
  );
};
