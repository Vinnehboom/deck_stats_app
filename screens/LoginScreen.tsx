import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, StyleSheet, TextInput, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { showMessage } from "react-native-flash-message";
import { StackNavigationProp } from "@react-navigation/stack";

import { authInstance } from "../firebase/firebaseconfig";
import { colors } from "../utils/colors";
import { RootStackParamList } from "../types/RouteParams";

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

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
        message: "Email or password cannot be empty",
        type: "warning",
      });
      return;
    }

    authInstance
      .createUserWithEmailAndPassword(email, password)
      .then()
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
        message: "Email or password cannot be empty",
        type: "warning",
      });
      return;
    }

    authInstance
      .signInWithEmailAndPassword(email, password)
      .then()
      .catch(error => {
        showMessage({
          message: `${error.message}`,
          type: "warning",
        });
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput placeholder="Email" value={email} onChangeText={text => setEmail(text)} style={styles.input} />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}> Login </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSignUp} style={[styles.button, styles.buttonOutline]}>
          <Text style={styles.buttonOutlineText}> Register </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.darkBlue,
    borderRadius: 10,
    padding: 15,
    width: "100%",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    width: "60%",
  },
  buttonOutline: {
    backgroundColor: "white",
    borderColor: colors.darkBlue,
    borderWidth: 2,
    marginTop: 5,
  },
  buttonOutlineText: {
    color: colors.darkBlue,
    fontSize: 16,
    fontWeight: "700",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  inputContainer: {
    width: "80%",
  },
});
