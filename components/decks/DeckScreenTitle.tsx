import { Text, HStack } from "native-base";
import React from "react";

import { colors } from "../../utils/colors";
import { ArchetypeIcons } from "./ArchetypeIcons";
import { Deck } from "../../types";

export const DeckScreenTitle = ({ deck }: { deck: Deck }) => {
  return (
    <HStack>
      <ArchetypeIcons archetype={deck.archetype} />
      <Text fontWeight="bold" color={colors.white} fontSize={18} marginLeft={1} padding={2}>
        {deck.name}
      </Text>
    </HStack>
  );
};
