import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { colors } from "../utils/colors"
import { useAuthContext } from "../contexts/useAuthContext"

const LandingScreen = () => {
  const { user, signOut } = useAuthContext()

  return (
    <View style={styles.container}>
      <Text> Email: {user.email} </Text>
      <TouchableOpacity onPress={signOut} style={[styles.button]}>
        <Text style={[styles.buttonText]}> Sign out </Text>
      </TouchableOpacity>
    </View>
  )
}

export default LandingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  button: {
    marginTop: 40,
    backgroundColor: colors.darkBlue,
    width: "60%",
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
  },
})
