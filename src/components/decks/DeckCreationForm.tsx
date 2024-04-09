import { View } from "react-native";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { showMessage } from "react-native-flash-message";
import { useTranslation } from "react-i18next";

import { TextInput } from "../layout/forms/TextInput";
import "react-native-get-random-values";
import { Colors } from "../../styles/variables";
import { DeckCreationFormStyle } from "../../styles/decks/DeckCreationFormStyle";
import { Deck, User, ArchetypeBase } from "../../types";
import { ArchetypeSelect } from "../archetypes/ArchetypeSelect";
import { useDeckCreation } from "./_queries/useDeckCreation";
import { Button } from "../layout/Button";
import { ElevatedContainer } from "../layout/ElevatedContainer";
import { Header } from "../layout/Header";

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
    <ElevatedContainer paddingTop={3} style={{ backgroundColor: Colors.light }}>
      <Header header="h2">{t("DECK.CREATION_FORM.TITLE")}</Header>
      <View style={DeckCreationFormStyle.deckForm}>
        <TextInput
          placeholder={t("DECK.CREATION_FORM.NAME")}
          placeholderTextColor={Colors["primary-dark"]}
          value={deckName}
          onChangeText={text => setDeckName(text)}
        />
        <ArchetypeSelect listContainerTop={95} setDeckArchetype={setDeckArchetype} selectedArchetype={deckArchetype} />
        <Button marginY={3} onPress={handleDeckCreation} width="auto" text={t("DECK.CREATION_FORM.SUBMIT")} />
      </View>
    </ElevatedContainer>
  );
};
