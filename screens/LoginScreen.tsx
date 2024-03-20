import React, { useState, useEffect } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { showMessage } from "react-native-flash-message";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { Text, Box } from "native-base";
import { StrokeText } from "@charmy.tech/react-native-stroke-text";

import { authInstance } from "../firebase/firebaseconfig";
import { colors } from "../utils/colors";
import { RootStackParamList } from "../types/RouteParams";
import { LoginScreenContainer } from "../components/layout/LoginScreenContainer";
import { LoginScreenStyle } from "../styles/login/LoginScreenStyle";

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

        <View style={LoginScreenStyle.inputContainer}>
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
          <TouchableOpacity onPress={handleLogin} style={LoginScreenStyle.button}>
            <Text style={LoginScreenStyle.buttonText}> {t("LOGIN_SCREEN.FORM.SIGN_IN")} </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSignUp} style={[LoginScreenStyle.button, LoginScreenStyle.buttonOutline]}>
            <Text style={LoginScreenStyle.buttonOutlineText}>{t("LOGIN_SCREEN.FORM.SIGN_UP")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LoginScreenContainer>
  );
};
