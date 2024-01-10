import React from "react"
import { Text, View } from "react-native"
import { RouteProp, useRoute } from "@react-navigation/native"
import { DeckListTabParamsType } from "../../../types/RouteParams"

const DecklistDetails = () => {
  const { params } = useRoute<RouteProp<DeckListTabParamsType, "Params">>()
  const { deck } = params

  return (
    <View>
      <Text>{deck.name}</Text>
    </View>
  )
}

export default DecklistDetails
