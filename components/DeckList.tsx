import React from "react"
import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
import { colors } from "../utils/colors"
import { useNavigation } from "@react-navigation/core"

export const DeckList = ({ deck }) => {
  const navigation = useNavigation()

  const showPage = () => {
    navigation.navigate("DecklistHome", { deck: deck })
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
