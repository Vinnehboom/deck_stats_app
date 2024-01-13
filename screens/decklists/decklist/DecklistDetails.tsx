import React from "react";
import { Text } from "react-native";
import { Container } from "native-base";
import { RouteProp, useRoute } from "@react-navigation/native";

import { DeckListTabParamsType } from "../../../types/RouteParams";

export const DecklistDetails = () => {
  const { params } = useRoute<RouteProp<DeckListTabParamsType, "Params">>();
  const { deck } = params;

  return (
    <Container safeAreaTop>
      <Text>{deck.name}</Text>
    </Container>
  );
};
