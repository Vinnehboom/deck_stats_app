import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const HomeScreen = () => {
  return(
    <View style={styles.container}>
      <Text> Email: </Text>

      <TouchableOpacity onPress={() => {}} style={[styles.button]}>
        <Text style={[styles.buttonText]}> Sign out </Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({})
