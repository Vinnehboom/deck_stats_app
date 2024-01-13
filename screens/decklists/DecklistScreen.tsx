import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { showMessage } from "react-native-flash-message";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import { colors } from "../../utils/colors";
import { DeckItem } from "../../components/DeckItem";
import { Spinner } from "../../components/Spinner";
import { Deck } from "../../types";

export const DecklistScreen = () => {
  const [deckName, setDeckName] = useState<string>("");
  const [decks, setDecks] = useState<Deck[] | []>([]);
  const [createdDecks, setCreatedDecks] = useState<Deck[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const user = auth().currentUser;

  useEffect(() => {
    getDecks();
  }, [createdDecks]);

  const getDecks = async () => {
    setLoading(true);
    const snapshot = await firestore().collection("Decks").get();
    const data = snapshot.docs.map(doc => doc.data()) as Deck[];
    setDecks(data);
    setLoading(false);
  };

  const displayDecks = () => {
    if (decks.length > 0) {
      return decks.map((deck, index) => <DeckItem key={index + 1} deck={deck} />);
    }
  };

  const handleDeckCreation = () => {
    if (deckName.length > 0) {
      const myuuid = uuidv4();
      const deck: Deck = {
        id: myuuid,
        name: deckName,
        userId: user!.uid,
      };
      firestore()
        .collection("Decks")
        .add(deck)
        .then(() => {
          showMessage({
            message: "Deck added!",
            type: "info",
          });
          setCreatedDecks([deck]);
          setDeckName("");
        });
    } else {
      showMessage({
        message: "Please add a deck name",
        type: "warning",
      });
    }
  };

  if (loading) {
    return (
      <>
        <Spinner />
      </>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Decklists </Text>
        <View>
          <Text style={styles.subTitle}>Add decklist</Text>
          <View style={styles.deckForm}>
            <TextInput
              placeholder="Deck title"
              value={deckName}
              onChangeText={text => setDeckName(text)}
              style={styles.deckForm.formField}
            />
            <TouchableOpacity onPress={handleDeckCreation} style={styles.button}>
              <Text style={styles.buttonText}> Add deck </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.subTitle}>Decks</Text>

          <View>{displayDecks()}</View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.darkBlue,
    borderRadius: 10,
    padding: 10,
    width: "auto",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    paddingTop: 64,
  },
  deckForm: {
    alignItems: "center",
    flexDirection: "row",
    formField: {
      backgroundColor: "white",
      paddingHorizontal: 5,
      paddingVertical: 5,
      borderRadius: 5,
      fontSize: 14,
      height: "100%",
      marginRight: "5%",
      width: "50%",
    },
    width: "100%",
  },
  subTitle: {
    fontSize: 18,
    paddingVertical: 24,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
});
