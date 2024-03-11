import { TextInput } from "react-native";
import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { Flex, Image, Text, HStack } from "native-base";
import { useDebounce } from "use-lodash-debounce";

import { ArchetypesList } from "./ArchetypesList";
import { ArchetypeBase } from "../../types";
import { transformArchetypes } from "../../helpers/archetypes";
import { Archetype } from "../../types";
import { Spinner } from "../Spinner";
import { useArchetypeQuery } from "././_queries/useArchetypeQuery";
import { isArchetype } from "../../helpers/typeGuards";
import { ArchetypeSelectStyle } from "../../styles/archetypes/ArchetypeSelectStyle";

export const ArchetypeSelect = ({
  setDeckArchetype,
  selectedArchetype,
  listContainerTop,
}: {
  setDeckArchetype:
    | Dispatch<SetStateAction<ArchetypeBase | Archetype | undefined>>
    | ((v: ArchetypeBase | Archetype | undefined) => void);
  selectedArchetype: ArchetypeBase | Archetype | undefined | Record<string, unknown>;
  listContainerTop?: number;
}) => {
  const [archetypeQuery, setArchetypeQuery] = useState<string>("");
  const debouncedArchetypeQuery = useDebounce(archetypeQuery, 400);
  const [queriedArchetypes, setQueriedArchetypes] = useState<(ArchetypeBase | Archetype)[]>([]);
  const { archetypes, isLoading } = useArchetypeQuery();

  useEffect(() => {
    if (archetypes && debouncedArchetypeQuery !== "") {
      setQueriedArchetypes(transformArchetypes(archetypes, [8, 9, 10], archetypeQuery));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedArchetypeQuery]);

  const handleArchetypeSelection = (archetype: ArchetypeBase | Archetype) => {
    setDeckArchetype(archetype);
    setArchetypeQuery("");
  };

  if (isLoading) return <Spinner />;

  if (!isArchetype(selectedArchetype))
    return (
      <>
        <HStack>
          <TextInput
            placeholder="Find archetype..."
            value={archetypeQuery}
            onChangeText={text => setArchetypeQuery(text)}
            style={ArchetypeSelectStyle.selectField}
          />
        </HStack>
        <ArchetypesList
          archetypes={queriedArchetypes}
          listContainerTop={listContainerTop}
          shown={archetypeQuery.length > 0}
          handleArchetypeSelection={handleArchetypeSelection}
        />
      </>
    );

  if (isArchetype(selectedArchetype))
    return (
      <>
        <Flex flexDirection="row">
          <Text marginY={1} marginRight={2} onPress={() => setDeckArchetype(undefined)} fontSize="md">
            Archetype: {selectedArchetype.name}
          </Text>
          {selectedArchetype.icons?.length &&
            selectedArchetype.icons.map((icon, index) => (
              <Image
                marginRight={2}
                key={icon + index}
                source={{
                  uri: `https://limitlesstcg.s3.us-east-2.amazonaws.com/pokemon/gen9/${icon}.png`,
                }}
                alt={icon}
                size="2xs"
              />
            ))}
        </Flex>
      </>
    );
  return <></>;
};
