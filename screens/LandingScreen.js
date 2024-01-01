import React, { useContext } from "react"
import AuthContext from "../contexts/AuthContext"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { colors } from "../utils/colors"

const LandingScreen = () => {
  const { user, handleSignOut } = useContext(AuthContext)

  return (
    <View style={styles.container}>
      <Text> Email: {user.email} </Text>
      <TouchableOpacity onPress={handleSignOut} style={[styles.button]}>
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
