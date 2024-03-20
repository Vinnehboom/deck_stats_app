import React, { useState, useEffect, useReducer } from "react";
import { TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { showMessage } from "react-native-flash-message";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { Text, Box, Button, Link } from "native-base";
import { StrokeText } from "@charmy.tech/react-native-stroke-text";

import { authInstance } from "../firebase/firebaseconfig";
import { colors } from "../utils/colors";
import { RootStackParamList } from "../types/RouteParams";
import { LoginScreenContainer } from "../components/layout/LoginScreenContainer";
import { LoginScreenStyle } from "../styles/login/LoginScreenStyle";
import { TermsAndConditions } from "../components/layout/TermsAndConditions";

type loginStateType = { email: string; password: string; passwordConfirmation: string };

const loginFormReducer = (
  state: loginStateType,
  action: { type: "SET_EMAIL" | "SET_PASSWORD" | "SET_PASSWORD_CONFIRMATION" | "CLEAR"; payload?: string }
): loginStateType => {
  switch (action.type) {
    case "SET_EMAIL": {
      return typeof action.payload === "string" ? { ...state, email: action.payload } : { ...state };
    }
    case "SET_PASSWORD": {
      return typeof action.payload === "string" ? { ...state, password: action.payload } : { ...state };
    }

    case "SET_PASSWORD_CONFIRMATION": {
      return typeof action.payload === "string" ? { ...state, passwordConfirmation: action.payload } : { ...state };
    }

    case "SET_EMAIL": {
      return typeof action.payload === "string" ? { ...state, email: action.payload } : { ...state };
    }
    case "CLEAR": {
      return { email: "", password: "", passwordConfirmation: "" };
    }
  }
};

export const LoginScreen = () => {
  const [loginState, loginFormDispatch] = useReducer(loginFormReducer, { email: "", password: "", passwordConfirmation: "" });

  const [login, setLogin] = useState(true);
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
    if (loginState.email.trim().length < 1 || loginState.password.trim().length < 1) {
      return showMessage({
        message: t("LOGIN_SCREEN.INCOMPLETE_FORM"),
        type: "warning",
      });
    }

    if (loginState.password !== loginState.passwordConfirmation) {
      return showMessage({
        message: t("LOGIN_SCREEN.PASSWORD_MISMATCH"),
        type: "warning",
      });
    }

    authInstance
      .createUserWithEmailAndPassword(loginState.email, loginState.password)
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
    if (loginState.email.trim().length < 1 || loginState.password.trim().length < 1) {
      showMessage({
        message: t("LOGIN_SCREEN.INCOMPLETE_FORM"),
        type: "warning",
      });
      return;
    }

    authInstance
      .signInWithEmailAndPassword(loginState.email, loginState.password)
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
                text={login ? t("LOGIN_SCREEN.FORM.LOGIN_TITLE") : t("LOGIN_SCREEN.FORM.REGISTER_TITLE")}
              />
            </Box>
            <TextInput
              placeholder={t("LOGIN_SCREEN.FORM.EMAIL")}
              value={loginState.email}
              onChangeText={text => loginFormDispatch({ type: "SET_EMAIL", payload: text })}
              style={LoginScreenStyle.input}
            />
            <TextInput
              placeholder={t("LOGIN_SCREEN.FORM.PASSWORD")}
              value={loginState.password}
              onChangeText={text => loginFormDispatch({ type: "SET_PASSWORD", payload: text })}
              style={LoginScreenStyle.input}
              secureTextEntry
            />
            {login ? null : (
              <TextInput
                placeholder={t("LOGIN_SCREEN.FORM.PASSWORD_CONFIRMATION")}
                value={loginState.passwordConfirmation}
                onChangeText={text => loginFormDispatch({ type: "SET_PASSWORD_CONFIRMATION", payload: text })}
                style={LoginScreenStyle.input}
                secureTextEntry
              />
            )}
          </View>

          <View style={LoginScreenStyle.buttonContainer}>
            {login ? (
              <>
                <Button style={LoginScreenStyle.button} marginY={3} colorScheme="primary" onPress={handleLogin}>
                  <Text style={LoginScreenStyle.buttonText}> {t("LOGIN_SCREEN.FORM.SIGN_IN")} </Text>
                </Button>
                <Link marginTop={3} onPress={() => setLogin(!login)}>
                  <Text color={colors["primary-dark"]}>{t("LOGIN_SCREEN.FORM.SIGN_UP")}</Text>
                </Link>
              </>
            ) : (
              <>
                <Button bgColor={colors["primary-dark"]} style={LoginScreenStyle.button} onPress={handleSignUp}>
                  <Text style={LoginScreenStyle.buttonText}>{t("LOGIN_SCREEN.FORM.SIGN_UP")}</Text>
                </Button>
                <Link marginTop={3} onPress={() => setLogin(!login)}>
                  <Text color={colors["primary-dark"]}>{t("LOGIN_SCREEN.FORM.SIGN_IN")}</Text>
                </Link>
              </>
            )}
          </View>
        </Box>
        <Box position="absolute" bottom={5}>
          <TermsAndConditions />
        </Box>
      </View>
    </LoginScreenContainer>
  );
};
