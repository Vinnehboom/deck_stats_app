import React, { useState, useEffect } from "react";
import { TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { showMessage } from "react-native-flash-message";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { Text, Box, Button } from "native-base";
import { StrokeText } from "@charmy.tech/react-native-stroke-text";

import { authInstance } from "../firebase/firebaseconfig";
import { colors } from "../utils/colors";
import { RootStackParamList } from "../types/RouteParams";
import { LoginScreenContainer } from "../components/layout/LoginScreenContainer";
import { LoginScreenStyle } from "../styles/login/LoginScreenStyle";
import { TermsAndConditions } from "../components/layout/TermsAndConditions";

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();

  useEffect(() => {
    const unsubscribe = authInstance.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Home", undefined);
      }
    });

    return unsubscribe;
  }, [navigation]);

  const handleSignUp = () => {
    if (email.trim() === "" || password.trim() === "") {
      showMessage({
        message: t("LOGIN_SCREEN.INCOMPLETE_FORM"),
        type: "warning",
      });
      return;
    }

    authInstance
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        showMessage({
          message: t("LOGIN_SCREEN.SIGN_UP.SUCCESS"),
          type: "success",
        });
      })
      .catch(error => {
        showMessage({
          message: `${error.message}`,
          type: "warning",
        });
      });
  };

  const handleLogin = () => {
    if (email.trim() === "" || password.trim() === "") {
      showMessage({
        message: t("LOGIN_SCREEN.INCOMPLETE_FORM"),
        type: "warning",
      });
      return;
    }

    authInstance
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        showMessage({
          message: t("LOGIN_SCREEN.SIGN_IN.SUCCESS"),
          type: "success",
        });
      })
      .catch(error => {
        showMessage({
          message: error,
          type: "warning",
        });
      });
  };

  return (
    <LoginScreenContainer>
      <View style={LoginScreenStyle.content}>
        <Box style={LoginScreenStyle.title}>
          <StrokeText
            fontFamily="BungeeInline-Regular"
            color={colors.light}
            strokeColor={colors["primary-dark"]}
            strokeWidth={2}
            fontSize={32}
            text={t("LOGIN_SCREEN.TITLE")}
          />
        </Box>
        <Box style={LoginScreenStyle.formContainer}>
          <View style={LoginScreenStyle.inputContainer}>
            <Box style={LoginScreenStyle.formTitle}>
              <StrokeText
                fontFamily="BungeeInline-Regular"
                color="#ffffff"
                strokeColor={colors["primary-dark"]}
                strokeWidth={3}
                fontSize={26}
                text={t("LOGIN_SCREEN.FORM.LOGIN_TITLE")}
              />
            </Box>
            <TextInput
              placeholder={t("LOGIN_SCREEN.FORM.EMAIL")}
              value={email}
              onChangeText={text => setEmail(text)}
              style={LoginScreenStyle.input}
            />
            <TextInput
              placeholder={t("LOGIN_SCREEN.FORM.PASSWORD")}
              value={password}
              onChangeText={text => setPassword(text)}
              style={LoginScreenStyle.input}
              secureTextEntry
            />
          </View>

          <View style={LoginScreenStyle.buttonContainer}>
            <Button style={LoginScreenStyle.button} marginY={3} colorScheme="primary" onPress={handleLogin}>
              <Text style={LoginScreenStyle.buttonText}> {t("LOGIN_SCREEN.FORM.SIGN_IN")} </Text>
            </Button>

            <Button bgColor={colors["primary-dark"]} style={LoginScreenStyle.button} onPress={handleSignUp}>
              <Text style={LoginScreenStyle.buttonText}>{t("LOGIN_SCREEN.FORM.SIGN_UP")}</Text>
            </Button>
          </View>
        </Box>
        <Box position="absolute" bottom={5}>
          <TermsAndConditions />
        </Box>
      </View>
    </LoginScreenContainer>
  );
};
