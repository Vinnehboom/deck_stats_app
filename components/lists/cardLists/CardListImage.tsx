import { Image, Text, Center, Circle } from "native-base";
import React from "react";

import { CardListItem } from "../../../types";
import { ListItemStyle } from "../../../styles/lists/ListItemStyle";
export const CardListImage = ({ count, card }: CardListItem) => {
  return (
    <Center style={ListItemStyle.cardImage} key={`${card.setId} ${card.setNumber}`}>
      <Circle style={ListItemStyle.countCircle}>
        <Text style={ListItemStyle.countCircleCount}>{count}</Text>
      </Circle>
      <Image
        zIndex={-1}
        source={{
          uri: `https://images.pokemontcg.io/${card.apiSetId}/${card.setNumber}.png`,
        }}
        resizeMode="contain"
        borderRadius="5"
        alt={card.name}
        size="lg"
      />
    </Center>
  );
};
