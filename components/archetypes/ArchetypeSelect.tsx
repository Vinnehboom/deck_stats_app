import { TextInput } from "react-native";
import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { Flex, Image, ScrollView, VStack, HStack } from "native-base";
import { useDebounce } from "use-lodash-debounce";

import { Text } from "../../components/layout/Text";
import { ArchetypeBase } from "../../types";
import { transformArchetypes, transformIdentifier } from "../../helpers/archetypes";
import { Archetype } from "../../types";
import { ArchetypeSelectStyle } from "../../styles/archetypes/ArchetypeSelectStyle";
import { Spinner } from "../Spinner";
import { useArchetypeQuery } from "././_queries/useArchetypeQuery";

const ArchetypesList = ({
  archetypes,
  shown,
  top,
  handleArchetypeSelection,
}: {
  archetypes: (ArchetypeBase | Archetype)[];
  shown: boolean;
  top?: number;
  handleArchetypeSelection: (archetype: ArchetypeBase | Archetype) => void;
}) => {
  return archetypes.length && shown ? (
    <VStack space="xs" style={top ? [ArchetypeSelectStyle.selectContainer, { top }] : ArchetypeSelectStyle.selectContainer}>
      <ScrollView minHeight="100%">
        {archetypes.map(archetype => (
          <Flex
            marginX={1}
            flexDirection="row"
            justifyContent="space-between"
            key={archetype.identifier}
            borderBottomWidth={0.2}
            padding={2}
            minWidth="75%">
            <Text onPress={() => handleArchetypeSelection(archetype)}>{transformIdentifier(archetype.identifier)}</Text>
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

export const ArchetypeSelect = ({
  setDeckArchetype,
  listContainerTop,
  selectedArchetype,
}: {
  setDeckArchetype: Dispatch<SetStateAction<ArchetypeBase | Archetype | undefined>>;
  selectedArchetype: ArchetypeBase | Archetype | undefined;
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

  if (!selectedArchetype)
    return (
      <>
        <HStack maxWidth="75%">
          <TextInput
            placeholder="Find archetype..."
            value={archetypeQuery}
            onChangeText={text => setArchetypeQuery(text)}
            style={ArchetypeSelectStyle.selectField}
          />
        </HStack>
        <ArchetypesList
          top={listContainerTop}
          archetypes={queriedArchetypes}
          shown={archetypeQuery.length > 0}
          handleArchetypeSelection={handleArchetypeSelection}
        />
      </>
    );

  if (selectedArchetype)
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
