import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "../utils/colors";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { DeckList } from "../components/DeckList";
import { Spinner } from "../components/Spinner";
import { showMessage, hideMessage } from "react-native-flash-message";
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const DecklistScreen = () => {
  const [deckName, setDeckName] = useState('');
  const [deckLists, setDecklists] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = auth().currentUser;

  useEffect(() =>{
    getLists();
  }, []);

  const getLists = async () => {
    setLoading(true);
    let snapshot = await firestore().collection('Decklists').get();
    let data = snapshot.docs.map((doc) => doc.data());
    setDecklists(data);
    setLoading(false);
  };

  const displayLists = () => {
    if(deckLists.length > 0) {
      let items = deckLists.map(deck => <DeckList key={deck.id} deck={deck} />);
      return items;
    }
  };

  const handleDeckCreation = () => {
    if(deckName.length > 0) {
      let myuuid = uuidv4();
      firestore()
        .collection('Decklists')
        .add({
          id: myuuid,
          name: deckName,
          userId: user.uid,
        })
        .then(() => {
          showMessage({
            message: "Deck added!",
            type: "info",
          });
        });
    } else {
      showMessage({
        message: "Please add a deck name",
        type: "warning",
      });
    }
  };

  if(loading) {
    return(
      <>
        <Spinner />
      </>)
  } else {
    return(
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
            <TouchableOpacity onPress={handleDeckCreation} style={[styles.button]}>
              <Text style={[styles.buttonText]}> Add deck </Text>
            </TouchableOpacity>
          </View>

          <Text>Decks</Text>

          <View>{ displayLists() }</View>
        </View>

      </View>
    );
  }
};

export default DecklistScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  subTitle: {
    fontSize: 18,
    textAlign: "center",
  },
  deckForm: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    formField: {
      backgroundColor: 'white',
      paddingHorizontal: 5,
      paddingVertical: 5,
      borderRadius: 5,
      fontSize: 14,
      height: "100%",
      marginRight: "5%",
      width: "50%",
    },
  },
  container: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
  },
  button: {
    backgroundColor: colors.darkBlue,
    width: 'auto',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
});
