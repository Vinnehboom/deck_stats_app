import React, { useState, useEffect, useReducer, useContext } from "react";
import { TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { showMessage } from "react-native-flash-message";
import { StackNavigationProp } from "@react-navigation/stack";
import { Text, Box, Button, Link, Radio, HStack } from "native-base";
import { StrokeText } from "@charmy.tech/react-native-stroke-text";

import { authInstance } from "../../firebase/firebaseconfig";
import { Colors, Typography } from "../../styles/variables";
import { RootStackParamList } from "../../types/RouteParams";
import { LoginScreenContainer } from "../../components/layout/LoginScreenContainer";
import { LoginScreenStyle } from "../../styles/login/LoginScreenStyle";
import { TermsAndConditions } from "../../components/layout/TermsAndConditions";
import { TranslationContext } from "../../contexts/TranslationContext";
import { loginFormReducer } from "./loginReducer";
import { GoogleSignInButton } from "../../components/login/GoogleSignInButton";
import { authUsername, isEmail } from "../../helpers/login";

export const LoginScreen = () => {
  const [loginState, loginFormDispatch] = useReducer(loginFormReducer, {
    identifier: "",
    password: "",
    passwordConfirmation: "",
  });

  const [login, setLogin] = useState(true);
  const [identifier, setIdentifier] = useState<"email" | "username">("email");
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { t } = useContext(TranslationContext);

  useEffect(() => {
    const unsubscribe = authInstance.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Home", undefined);
      }
    });

    return unsubscribe;
  }, [navigation]);

  const handleSignUp = () => {
    if (loginState.identifier.trim().length < 1 || loginState.password.trim().length < 1) {
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

    let userIdentifier = loginState.identifier;
    if (identifier === "username") userIdentifier = authUsername(loginState.identifier);

    authInstance
      .createUserWithEmailAndPassword(userIdentifier, loginState.password)
      .then(() => {
        showMessage({
          message: t("LOGIN_SCREEN.SIGN_UP.SUCCESS"),
          type: "success",
        });
      })
      .catch(error => {
        let msg: string = error.message;
        if (!isEmail(loginState.identifier) && identifier === "username") msg = msg.replace("email address", "username");
        showMessage({
          message: msg,
          type: "warning",
        });
      });
  };

  const handleLogin = () => {
    if (loginState.identifier.trim().length < 1 || loginState.password.trim().length < 1) {
      showMessage({
        message: t("LOGIN_SCREEN.INCOMPLETE_FORM"),
        type: "warning",
      });
      return;
    }

    let userIdentifier = loginState.identifier;
    if (!isEmail(loginState.identifier)) userIdentifier = authUsername(loginState.identifier);

    authInstance
      .signInWithEmailAndPassword(userIdentifier, loginState.password)
      .then(() => {
        showMessage({
          message: t("LOGIN_SCREEN.SIGN_IN.SUCCESS"),
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

  return (
    <LoginScreenContainer>
      <View style={LoginScreenStyle.content}>
        <Box style={LoginScreenStyle.title}>
          <StrokeText
            fontFamily="BungeeInline-Regular"
            color={Colors.light}
            strokeColor={Colors["primary-dark"]}
            strokeWidth={2}
            fontSize={Typography.fontSizes.xxxxl}
            text={t("LOGIN_SCREEN.TITLE")}
          />
        </Box>
        <Box style={LoginScreenStyle.formContainer}>
          <View style={LoginScreenStyle.inputContainer}>
            <Box style={LoginScreenStyle.formTitle}>
              <StrokeText
                fontFamily="BungeeInline-Regular"
                color="#ffffff"
                strokeColor={Colors["primary-dark"]}
                strokeWidth={3}
                fontSize={Typography.fontSizes.xxxl}
                text={login ? t("LOGIN_SCREEN.FORM.LOGIN_TITLE") : t("LOGIN_SCREEN.FORM.REGISTER_TITLE")}
              />
            </Box>
            {login ? null : (
              <Radio.Group
                justifyContent="space-around"
                alignSelf="center"
                name="myRadioGroup"
                accessibilityLabel="user-identifier"
                value={identifier}
                onChange={nextValue => {
                  setIdentifier(nextValue as "email" | "username");
                }}>
                <HStack space={12}>
                  <Radio value="email" my={1}>
                    <Text>{t("LOGIN_SCREEN.FORM.EMAIL")}</Text>
                  </Radio>
                  <Radio value="username" my={1}>
                    <Text>{t("LOGIN_SCREEN.FORM.USERNAME")}</Text>
                  </Radio>
                </HStack>
              </Radio.Group>
            )}
            <TextInput
              placeholder={
                login
                  ? t("LOGIN_SCREEN.FORM.EMAIL_SIGN_IN")
                  : identifier === "email"
                  ? t("LOGIN_SCREEN.FORM.EMAIL")
                  : t("LOGIN_SCREEN.FORM.USERNAME")
              }
              placeholderTextColor={Colors["primary-dark"]}
              value={loginState.identifier}
              onChangeText={text => loginFormDispatch({ type: "SET_IDENTIFIER", payload: text })}
              style={LoginScreenStyle.input}
            />
            <TextInput
              placeholder={t("LOGIN_SCREEN.FORM.PASSWORD")}
              value={loginState.password}
              placeholderTextColor={Colors["primary-dark"]}
              onChangeText={text => loginFormDispatch({ type: "SET_PASSWORD", payload: text })}
              style={LoginScreenStyle.input}
              secureTextEntry
            />
            {login ? null : (
              <TextInput
                placeholder={t("LOGIN_SCREEN.FORM.PASSWORD_CONFIRMATION")}
                placeholderTextColor={Colors["primary-dark"]}
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
                  <Text color={Colors["primary-dark"]}>{t("LOGIN_SCREEN.FORM.SIGN_UP")}</Text>
                </Link>
              </>
            ) : (
              <>
                <Button bgColor={Colors["primary-dark"]} style={LoginScreenStyle.button} onPress={handleSignUp}>
                  <Text style={LoginScreenStyle.buttonText}>{t("LOGIN_SCREEN.FORM.SIGN_UP")}</Text>
                </Button>
                <Link marginTop={3} onPress={() => setLogin(!login)}>
                  <Text color={Colors["primary-dark"]}>{t("LOGIN_SCREEN.FORM.SIGN_IN")}</Text>
                </Link>
              </>
            )}
          </View>
          <GoogleSignInButton />
        </Box>
        <Box position="absolute" bottom={5}>
          <TermsAndConditions />
        </Box>
      </View>
    </LoginScreenContainer>
  );
};
