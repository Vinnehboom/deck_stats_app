import { HStack } from "native-base";
import React from "react";

import { Text } from "../../components/layout/Text";
import { Colors, Typography } from "../../styles/variables";
import { ArchetypeIcons } from "./ArchetypeIcons";
import { Deck } from "../../types";

export const DeckScreenTitle = ({ deck }: { deck: Deck }) => {
  return (
    <HStack>
      <ArchetypeIcons archetype={deck.archetype} />
      <Text fontWeight="bold" color={Colors.white} fontSize={Typography.fontSizes.xl} marginLeft={1} padding={2}>
        {deck.name}
      </Text>
    </HStack>
  );
};
