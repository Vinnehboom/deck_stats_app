import { TextInput } from "react-native";
import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { Flex, Image, ScrollView, Text, VStack, HStack } from "native-base";
import { useDebounce } from "use-lodash-debounce";

import { ArchetypeBase } from "../../types";
import { transformArchetypes } from "../../helpers/archetypes";
import { Archetype } from "../../types";
import { DeckCreationFormStyle } from "../../styles/decks/DeckCreationFormStyle";
import { Spinner } from "../Spinner";
import { useArchetypeQuery } from "./queries/useArchetypeQuery";

const ArchetypesList = ({
  archetypes,
  shown,
  handleArchetypeSelection,
}: {
  archetypes: (ArchetypeBase | Archetype)[];
  shown: boolean;
  handleArchetypeSelection: (archetype: ArchetypeBase | Archetype) => void;
}) => {
  return archetypes.length && shown ? (
    <VStack space="xs" style={DeckCreationFormStyle.deckForm.selectContainer}>
      <ScrollView minHeight="100%">
        {archetypes.map(archetype => (
          <Flex
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

export const ArchetypeSelect = ({
  setDeckArchetype,
  selectedArchetype,
}: {
  setDeckArchetype: Dispatch<SetStateAction<ArchetypeBase | Archetype | undefined>>;
  selectedArchetype: ArchetypeBase | Archetype | undefined;
}) => {
  const [archetypeQuery, setArchetypeQuery] = useState<string>("");
  const [showSearchField, setShowSearchField] = useState<boolean>(true);
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
    setShowSearchField(false);
    setArchetypeQuery("");
  };

  if (isLoading) return <Spinner />;

  if (showSearchField)
    return (
      <>
        <HStack maxWidth="75%">
          <TextInput
            placeholder="Find archetype..."
            value={archetypeQuery}
            onChangeText={text => setArchetypeQuery(text)}
            style={DeckCreationFormStyle.deckForm.selectField}
          />
          {selectedArchetype ? (
            <Text marginLeft={3} marginY="auto" paddingTop={2} onPress={() => setShowSearchField(!showSearchField)}>
              Back
            </Text>
          ) : (
            <></>
          )}
        </HStack>
        <ArchetypesList
          archetypes={queriedArchetypes}
          shown={archetypeQuery.length > 0}
          handleArchetypeSelection={handleArchetypeSelection}
        />
      </>
    );

  if (!showSearchField && selectedArchetype)
    return (
      <>
        <Flex flexDirection="row">
          <Text marginY={1} marginRight={2} onPress={() => setShowSearchField(!showSearchField)} fontSize="md">
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
