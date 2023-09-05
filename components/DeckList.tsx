import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import {colors} from '../utils/colors';

export const DeckList = ({deck}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> { deck.name }</Text>
      <TouchableOpacity>
        <Text>Show</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    color: colors.white,
    borderWidth: .5,
    borderRadius: 10,
    margin: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  title: {
    fontSize: 14,
    color: colors.red,
  },
});
