import React from "react"
import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
import { Deck } from "../types"
import { colors } from "../utils/colors"
import { useNavigation } from "@react-navigation/core"
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from "../types/RouteParams"

type DeckListPropTypes = {
  deck: Deck
}

export const DeckItem = ({ deck }: DeckListPropTypes) => {
  const { push } = useNavigation<StackNavigationProp<RootStackParamList>>()

  const showPage = () => {
    push("DecklistHome", { deck: deck })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}> {deck.name}</Text>
      <TouchableOpacity onPress={showPage}>
        <Text>Show</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    color: colors.white,
    borderWidth: 0.5,
    borderRadius: 10,
    margin: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 14,
    color: colors.red,
  },
})
