import React, { useContext } from "react"
import { Text, View } from "react-native"
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
