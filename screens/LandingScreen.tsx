import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors } from "../utils/colors";
import { useAuthContext } from "../contexts/useAuthContext";

const LandingScreen = () => {
  const { user, signOut } = useAuthContext();

  return (
    <View style={styles.container}>
      <Text> Email: {user.email} </Text>
      <TouchableOpacity onPress={signOut} style={styles.button}>
        <Text style={styles.buttonText}> Sign out </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.darkBlue,
    borderRadius: 10,
    marginTop: 40,
    padding: 15,
    width: "60%",
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
});
