import { Image } from "native-base";
import React from "react";

import { Archetype, ArchetypeBase } from "../../types";

export const ArchetypeIcons = ({ archetype, size }: { archetype: Archetype | ArchetypeBase; size?: string }) => {
  if (archetype?.icons?.length) {
    return archetype.icons.map((icon, index) => (
      <Image
        marginRight={1}
        key={icon + index}
        source={{
          uri: `https://limitlesstcg.s3.us-east-2.amazonaws.com/pokemon/gen9/${icon}.png`,
        }}
        maxHeight="100%"
        resizeMode="contain"
        alt={icon}
        size={size || "xs"}
      />
    ));
  } else if (archetype) {
    return (
      <Image
        marginRight={1}
        source={require("../../assets/images/substitute.png")}
        maxHeight="100%"
        resizeMode="contain"
        alt="substitute"
        size={size || "xs"}
      />
    );
  }
};
