import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {colors} from '../utils/colors';

export const DecksList = ({decks}) => {
  return (
    <View style={styles.background}>
      <Text style={title}> Active Decks </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    padding: 8,
    color: colors.white,
  },
  title: {
    fontSize: 24,
    color: colors.red,
  },
});
