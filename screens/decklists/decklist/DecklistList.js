import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import {colors} from '../../../utils/colors';

import firestore from '@react-native-firebase/firestore';
import { showMessage } from "react-native-flash-message";

const DecklistList = (params) => {
  let props = params["route"]["params"];
  let { deck } = props;
  const [lists, setLists] = useState([]);
  const [listString, setListString] = useState('');


  const handleListSubmission = () => {
    let listObject = transformList();
    let fullCount = 0;
    Object.values(listObject).map(count => {
      let kount = parseInt(count) || 0;
      fullCount += kount;
    });
    if(fullCount == 60) {
      firestore()
        .collection('Lists')
        .add({
          deckId: deck.id,
          list: listObject,
        })
        .then(() => {
          showMessage({
            message: "List added!",
            type: "info",
          });
        })
    } else {
      showMessage({
        message: "Please add 60 cards to your import to continue",
        type: "warning",
      });
    }
  };

  const transformList = () => {
    let splitArray = listString.replace(/\r/g, "").split(/\n/);
    let mappedCardCounts = splitArray.map(cardEntry => {
      let count = cardEntry.substr(0,1);
      let cardString = cardEntry.substr(2);
      return [cardString, count];
    });
    let cardListHash = Object.fromEntries(mappedCardCounts)
    return cardListHash;
  };

  return(<View>
    <View style={styles.container}>
      <Text style={styles.title}> Import form</Text>
      <TextInput
        editable
        multiline
        placeholder="import"
        value={listString}
        onChangeText={text => setListString(text)}
        style={styles.listForm.formField}
      />
      <TouchableOpacity onPress={handleListSubmission}><Text>Submit list</Text></TouchableOpacity>
    </View>
  </View>)
};

export default DecklistList;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "600",
    marginVertical: 5
  },
  subTitle: {
    fontSize: 18,
    textAlign: "center",
  },
  listForm: {
    width: "100%",
    alignItems: "center",
    formField: {
      backgroundColor: 'white',
      paddingHorizontal: 5,
      paddingVertical: 5,
      borderRadius: 5,
      fontSize: 14,
      height: "75%",
      marginRight: "5%",
      width: "80%",
    },
  },
  container: {
    padding: 8,
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
