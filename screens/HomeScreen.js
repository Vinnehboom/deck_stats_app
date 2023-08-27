import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../utils/colors";
import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/core";

const HomeScreen = () => {

  const user = auth().currentUser;

  const navigation = useNavigation();
  const handleSignOut = () => {
    auth()
      .signOut()
      .then(() => {navigation.replace('Login');})
      .catch(error => alert(error.message));
  };

  return(
    <View style={styles.container}>
      <Text> Email: {user.email } </Text>

      <TouchableOpacity onPress={handleSignOut} style={[styles.button]}>
        <Text style={[styles.buttonText]}> Sign out </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  button: {
    marginTop: 40,
    backgroundColor: colors.darkBlue,
    width: '60%',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
})
