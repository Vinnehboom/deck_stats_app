import { Image, Center, Circle } from "native-base";
import React from "react";

import { Text } from "../../../components/layout/Text";
import { CardListItem } from "../../../types";
import { ListItemStyle } from "../../../styles/lists/ListItemStyle";
export const CardListImage = ({ count, card }: CardListItem) => {
  return (
    // TODO: save images as vars to use instead

    <Center style={ListItemStyle.cardImage} key={`${card.setId} ${card.setNumber}`}>
      <Circle style={ListItemStyle.countCircle}>
        <Text style={ListItemStyle.countCircleCount}>{count}</Text>
      </Circle>
      <Image
        zIndex={-1}
        source={{
          uri: `https://images.pokemontcg.io/${card.apiSetId}/${card.setNumber}.png`,
        }}
        fallbackSource={{
          uri: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4f7705ec-8c49-4eed-a56e-c21f3985254c/dah43cy-a8e121cb-934a-40f6-97c7-fa2d77130dd5.png/v1/fill/w_1024,h_1420/pokemon_card_backside_in_high_resolution_by_atomicmonkeytcg_dah43cy-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTQyMCIsInBhdGgiOiJcL2ZcLzRmNzcwNWVjLThjNDktNGVlZC1hNTZlLWMyMWYzOTg1MjU0Y1wvZGFoNDNjeS1hOGUxMjFjYi05MzRhLTQwZjYtOTdjNy1mYTJkNzcxMzBkZDUucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.9GzaYS7sd8RPY5FlHca09J9ZQZ9D9zI69Ru-BsbkLDA",
        }}
        resizeMode="contain"
        borderRadius="5"
        alt={card.name}
        size="lg"
      />
    </Center>
  );
};
