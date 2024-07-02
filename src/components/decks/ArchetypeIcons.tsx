import { Image } from "native-base";
import React from "react";

import { Archetype, ArchetypeBase } from "../../types";
import { UnknownArchetype } from "../../types/Archetype";
import { glcTypeIcons } from "../../helpers/images";

export const ArchetypeIcons = ({
  archetype,
  size,
}: {
  archetype: Archetype | ArchetypeBase | UnknownArchetype;
  size?: string;
}) => {
  const unknown = typeof archetype === "string";
  const threeIcons = !unknown && archetype?.icons?.length > 2;
  if (!archetype) {
    return;
  }
  return unknown ? (
    <Image
      marginRight={1}
      source={require("../../assets/images/substitute.png")}
      maxHeight="100%"
      resizeMode="contain"
      alt="substitute"
      size={size || "xs"}
    />
  ) : (
    archetype.icons.map((icon, index) => (
      <Image
        marginRight={1}
        key={icon + index}
        source={
          glcTypeIcons[icon] || {
            uri: `https://limitlesstcg.s3.us-east-2.amazonaws.com/pokemon/gen9/${icon}.png`,
          }
        }
        maxHeight="100%"
        resizeMode="contain"
        alt={icon}
        top={threeIcons ? -1 : 0}
        marginY={threeIcons ? 2 : "0"}
        size={size || (threeIcons ? "2xs" : "xs")}
      />
    ))
  );
};
