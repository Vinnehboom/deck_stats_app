import React, { useState, useEffect } from "react"
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { colors } from "../utils/colors"
import auth from "@react-native-firebase/auth"
import { useNavigation } from "@react-navigation/core"
import { showMessage } from "react-native-flash-message"
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from "../types/RouteParams"

const LoginScreen = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Home", undefined)
      }
    })

    return unsubscribe
  }, [navigation])

  const handleSignUp = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then()
      .catch(error => {
        showMessage({
          message: `${error.message}`,
          type: "warning",
        })
      })
  }

  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then()
      .catch(error => {
        showMessage({
          message: `${error.message}`,
          type: "warning",
        })
      })
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={[styles.button]}>
          <Text style={[styles.buttonText]}> Login </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}>
          <Text style={[styles.buttonOutlineText]}> Register </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: colors.darkBlue,
    borderWidth: 2,
  },
  button: {
    backgroundColor: colors.darkBlue,
    width: "100%",
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
  },
  buttonOutlineText: {
    color: colors.darkBlue,
    fontWeight: "700",
    fontSize: 16,
  },
})