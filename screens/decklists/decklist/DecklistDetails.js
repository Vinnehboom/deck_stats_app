import React, { useContext } from "react"
import { Text, View, StyleSheet } from "react-native"
import { colors } from "../../utils/colors"
import DeckContext from "../../../contexts/DeckContext"

const DecklistDetails = () => {
  const { deck } = useContext(DeckContext)
  return (
    <View>
      <Text>{deck.name}</Text>
    </View>
  )
}

export default DecklistDetails

const styles = StyleSheet.create({})
