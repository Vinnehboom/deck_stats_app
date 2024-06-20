import React, { useEffect, useState, Dispatch, SetStateAction, useContext } from "react";
import { Flex, Image, ScrollView, VStack, HStack, Link } from "native-base";
import { useDebounce } from "use-lodash-debounce";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { TouchableOpacity } from "react-native";

import { TextInput } from "../layout/forms/TextInput";
import { Text } from "../../components/layout/Text";
import { ArchetypeBase } from "../../types";
import { transformArchetypes, transformIdentifier } from "../../helpers/archetypes";
import { Archetype } from "../../types";
import { ArchetypeSelectStyle } from "../../styles/archetypes/ArchetypeSelectStyle";
import { Spinner } from "../Spinner";
import { useArchetypeQuery } from "././_queries/useArchetypeQuery";
import { Colors, Spacing } from "../../styles/variables";
import { ArchetypeIcons } from "../decks/ArchetypeIcons";
import { UnknownArchetype } from "../../types/MatchRecord";
import { TranslationContext } from "../../contexts/TranslationContext";

const ArchetypesList = ({
  archetypes,
  shown,
  top,
  handleArchetypeSelection,
}: {
  archetypes: (ArchetypeBase | Archetype)[];
  shown: boolean;
  top?: number;
  handleArchetypeSelection: (archetype: ArchetypeBase | Archetype | UnknownArchetype) => void;
}) => {
  const { t } = useContext(TranslationContext);
  return shown ? (
    <VStack space="xs" style={top ? [ArchetypeSelectStyle.selectContainer, { top }] : ArchetypeSelectStyle.selectContainer}>
      <ScrollView minHeight="100%" zIndex={9999} nestedScrollEnabled>
        {archetypes.map((archetype, i) => (
          <Flex
            marginX={1}
            flexDirection="row"
            justifyContent="space-between"
            key={archetype.identifier + i}
            borderBottomWidth={0.2}
            padding={2}
            minWidth="75%"
            zIndex={9999}>
            <Link display="flex" width="100%" onPress={() => handleArchetypeSelection(archetype)}>
              <Text marginRight={Spacing.md}>{transformIdentifier(archetype.identifier)}</Text>
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
            </Link>
          </Flex>
        ))}
        {archetypes.length < 1 ? (
          <Flex
            marginX={1}
            flexDirection="row"
            justifyContent="space-between"
            key="other"
            borderBottomWidth={0.2}
            padding={2}
            minWidth="75%"
            zIndex={9999}>
            <Text onPress={() => handleArchetypeSelection("other")}>{t("MATCH_RECORD.OTHER")}</Text>
            <Flex flexDirection="row">
              <Image
                marginRight={2}
                key={1}
                source={require("../../assets/images/substitute.png")}
                resizeMode="stretch"
                alt="substitute"
                size="2xs"
              />
            </Flex>
          </Flex>
        ) : null}
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
  setDeckArchetype: Dispatch<SetStateAction<ArchetypeBase | Archetype | UnknownArchetype | undefined>>;
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

  const handleArchetypeSelection = (archetype: ArchetypeBase | Archetype | UnknownArchetype) => {
    setDeckArchetype(archetype);
    setArchetypeQuery("");
  };

  const { t } = useContext(TranslationContext);

  if (isLoading) return <Spinner />;

  if (!selectedArchetype)
    return (
      <>
        <HStack marginY={-5} maxWidth="100%">
          <TextInput
            placeholder={t("MATCH_RECORD.FORM.FIND_ARCHETYPE")}
            placeholderTextColor={Colors["primary-dark"]}
            value={archetypeQuery}
            onChangeText={text => setArchetypeQuery(text)}
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
      <TouchableOpacity onPress={() => setDeckArchetype(undefined)}>
        <HStack flexDirection="row" alignItems="center" space={2}>
          <Text marginY={1} maxW="80%" fontSize="md">
            {selectedArchetype?.name || t("MATCH_RECORD.OTHER")}
          </Text>
          <ArchetypeIcons archetype={selectedArchetype} size="2xs" />
          <FontAwesomeIcon size={20} icon={faXmark} color="red" />
        </HStack>
      </TouchableOpacity>
    );
  return <></>;
};
