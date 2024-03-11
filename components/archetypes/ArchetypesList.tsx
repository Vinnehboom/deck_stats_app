import React from "react";
import { VStack, Flex, Text, Image, ScrollView } from "native-base";

import { ArchetypeBase, Archetype } from "../../types/Archetype";
import { ArchetypeSelectStyle } from "../../styles/archetypes/ArchetypeSelectStyle";

export const ArchetypesList = ({
  archetypes,
  shown,
  handleArchetypeSelection,
  listContainerTop,
}: {
  archetypes: (ArchetypeBase | Archetype)[];
  shown: boolean;
  handleArchetypeSelection: (archetype: ArchetypeBase | Archetype) => void;
  listContainerTop?: number;
}) => {
  const containerStyle = listContainerTop
    ? [ArchetypeSelectStyle.selectContainer, { top: listContainerTop }]
    : ArchetypeSelectStyle.selectContainer;
  return archetypes.length && shown ? (
    <VStack space="xs" style={containerStyle}>
      <ScrollView minHeight="100%">
        {archetypes.map(archetype => (
          <Flex
            zIndex={"999"}
            marginX={1}
            flexDirection="row"
            justifyContent="space-between"
            key={archetype.identifier}
            borderBottomWidth={1}
            padding={2}
            minWidth="75%">
            <Text onPress={() => handleArchetypeSelection(archetype)}>{archetype.name}</Text>
            <Flex flexDirection="row">
              {archetype.icons?.length &&
                archetype.icons.map((icon, index) => (
                  <Image
                    marginRight={2}
                    key={icon + index}
                    source={{
                      uri: `https://limitlesstcg.s3.us-east-2.amazonaws.com/pokemon/gen9/${icon}.png`,
                    }}
                    resizeMode="stretch"
                    alt={icon}
                    size="2xs"
                  />
                ))}
            </Flex>
          </Flex>
        ))}
      </ScrollView>
    </VStack>
  ) : (
    <></>
  );
};
