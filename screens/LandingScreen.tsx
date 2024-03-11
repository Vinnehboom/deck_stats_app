import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { useTranslation } from "react-i18next";
import { ScrollView } from "native-base";
import auth from "@react-native-firebase/auth";

import { useGetActiveDeck } from "../components/decks/_queries/useGetActiveDeck";
import { useAuthContext } from "../contexts/useAuthContext";
import { LandingScreenStyle } from "../styles/LandingScreenStyle";
import { Spinner } from "../components/Spinner";
import { ActiveDeck } from "../components/decks/ActiveDeck";

export const LandingScreen = () => {
  const { signOut } = useAuthContext();
  const user = auth().currentUser;
  const { t } = useTranslation();
  const { queryResult: activeDeck, isLoading, isFetching } = useGetActiveDeck(user!);
  const deck = activeDeck?.deck;

  return (
    <View style={LandingScreenStyle.container}>
      <ScrollView>
        <Image style={LandingScreenStyle.logo} source={require("../assets/images/pokeball-bit.png")} />
        <Text style={LandingScreenStyle.welcome}>Welcome back, trainer!</Text>
        {isLoading || isFetching ? <Spinner /> : <ActiveDeck deck={deck!} />}

        <TouchableOpacity onPress={signOut} style={LandingScreenStyle.button}>
          <Text style={LandingScreenStyle.buttonText}> {t("LANDING_SCREEN.SIGN_OUT")} </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
