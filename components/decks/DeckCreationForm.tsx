import { TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { showMessage } from "react-native-flash-message";
import { VStack, Text, Box } from "native-base";
import { useTranslation } from "react-i18next";

import "react-native-get-random-values";
import { colors } from "../../utils/colors";
import { DeckCreationFormStyle } from "../../styles/decks/DeckCreationFormStyle";
import { Deck, User, ArchetypeBase } from "../../types";
import { ArchetypeSelect } from "../archetypes/ArchetypeSelect";
import { useDeckCreation } from "./_queries/useDeckCreation";

type DeckCreationFormPropsType = {
  user: User | null;
};

export const DeckCreationForm = ({ user }: DeckCreationFormPropsType) => {
  const [deckName, setDeckName] = useState<string>("");
  const { t } = useTranslation();

  const deckCreationMutation = useDeckCreation(() => {
    showMessage({
      message: t("DECK.CREATION_FORM.CREATION.SUCCESS"),
      type: "info",
    });
    setDeckName("");
    setDeckArchetype(undefined);
  });

  const [deckArchetype, setDeckArchetype] = useState<ArchetypeBase>();

  const handleDeckCreation = () => {
    if (deckName.length > 0 && deckArchetype) {
      const myuuid = uuidv4();
      const deck: Deck = {
        id: myuuid,
        name: deckName,
        userId: user!.uid,
        archetype: deckArchetype,
      };
      deckCreationMutation.mutate(deck);
    } else {
      showMessage({
        message: t("DECK.CREATION_FORM.INCOMPLETE_FORM"),
        type: "warning",
      });
    }
  };

  return (
    <VStack paddingTop={3} style={[DeckCreationFormStyle.container, { backgroundColor: colors.light }]}>
      <Text style={DeckCreationFormStyle.formTitle}>{t("DECK.CREATION_FORM.TITLE")}</Text>
      <View style={DeckCreationFormStyle.deckForm}>
        <TextInput
          placeholder={t("DECK.CREATION_FORM.NAME")}
          value={deckName}
          onChangeText={text => setDeckName(text)}
          style={DeckCreationFormStyle.deckformField}
        />
        <Box width="80%">
          <ArchetypeSelect setDeckArchetype={setDeckArchetype} selectedArchetype={deckArchetype} />
        </Box>
        <TouchableOpacity onPress={handleDeckCreation} style={DeckCreationFormStyle.button}>
          <Text style={DeckCreationFormStyle.buttonText}> {t("DECK.CREATION_FORM.SUBMIT")} </Text>
        </TouchableOpacity>
      </View>
    </VStack>
  );
};
