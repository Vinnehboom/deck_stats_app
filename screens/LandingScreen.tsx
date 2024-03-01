import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { useTranslation } from "react-i18next";
import { Box, ScrollView, VStack, HStack } from "native-base";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";

import { ArchetypeIcons } from "../components/decks/ArchetypeIcons";
import { useGetActiveDeck } from "../components/decks/_queries/useGetActiveDeck";
import { useAuthContext } from "../contexts/useAuthContext";
import { LandingScreenStyle } from "../styles/LandingScreenStyle";
import { Spinner } from "../components/Spinner";
import { MainTabParamList } from "../types/RouteParams";

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
        <Image style={LandingScreenStyle.logo} source={require("../assets/images/pokeball-bit.png")} />
        <Text style={LandingScreenStyle.welcome}>Welcome back, trainer!</Text>
        {isLoading ? (
          <Spinner />
        ) : (
          <Box style={LandingScreenStyle.activeDeckContainer}>
            <VStack width={"100%"} justifyContent={"center"} display={"flex"}>
              <Text style={LandingScreenStyle.activeDeckTitle}>{t("LANDING_SCREEN.ACTIVE_DECK.TITLE")}</Text>
              {deck ? (
                <>
                  <HStack style={LandingScreenStyle.activeDeck}>
                    <Text style={LandingScreenStyle.activeDeckName}>{deck.name}</Text>
                    <ArchetypeIcons deck={deck} size={"xs"} />
                  </HStack>
                </>
              ) : (
                <Text style={LandingScreenStyle.setActiveDeckText}>
                  Please add an active deck on the{" "}
                  <Text style={LandingScreenStyle.setActiveDeckLink} onPress={() => navigate("Decks", undefined)}>
                    Decks
                  </Text>{" "}
                  tab
                </Text>
              )}
            </VStack>
          </Box>
        )}

        <TouchableOpacity onPress={signOut} style={LandingScreenStyle.button}>
          <Text style={LandingScreenStyle.buttonText}> {t("LANDING_SCREEN.SIGN_OUT")} </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
