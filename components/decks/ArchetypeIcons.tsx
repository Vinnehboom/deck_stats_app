import { Image } from "native-base";
import React from "react";

import { Deck } from "../../types";

export const ArchetypeIcons = ({ deck, size }: { deck: Deck; size?: string }) => {
  if (deck.archetype?.icons?.length)
    return deck.archetype.icons.map((icon, index) => (
      <Image
        marginRight={2}
        key={icon + index}
        source={{
          uri: `https://limitlesstcg.s3.us-east-2.amazonaws.com/pokemon/gen9/${icon}.png`,
        }}
        minHeight="100%"
        resizeMode="stretch"
        alt={icon}
        size={size || "2xs"}
      />
    ));
};
