import React, { useEffect, useState } from "react"
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { colors } from "../../utils/colors"
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import { DeckItem } from "../../components/DeckItem"
import { Spinner } from "../../components/Spinner"
import { showMessage } from "react-native-flash-message"
import "react-native-get-random-values"
import { v4 as uuidv4 } from "uuid"
import { Deck } from "../../types"

const DecklistScreen = () => {
  const [deckName, setDeckName] = useState<string>("")
  const [decks, setDecks] = useState<Deck[] | []>([])
  const [createdDecks, setCreatedDecks] = useState<Deck[]>()
  const [loading, setLoading] = useState<boolean>(false)
  const user = auth().currentUser

  useEffect(() => {
    getDecks()
  }, [createdDecks])

  const getDecks = async () => {
    setLoading(true)
    let snapshot = await firestore().collection("Decks").get()
    let data = snapshot.docs.map(doc => doc.data()) as Deck[]
    setDecks(data)
    setLoading(false)
  }

  const displayDecks = () => {
    if (decks.length > 0) {
      return decks.map((deck, index) => (
        <DeckItem key={index + 1} deck={deck} />
      ))
    }
  }

  const handleDeckCreation = () => {
    if (deckName.length > 0) {
      let myuuid = uuidv4()
      const deck: Deck = {
        id: myuuid,
        name: deckName,
        userId: user!.uid,
      }
      firestore()
        .collection("Decks")
        .add(deck)
        .then(() => {
          showMessage({
            message: "Deck added!",
            type: "info",
          })
          setCreatedDecks([deck])
          setDeckName("")
        })
    } else {
      showMessage({
        message: "Please add a deck name",
        type: "warning",
      })
    }
  }

  if (loading) {
    return (
      <>
        <Spinner />
      </>
    )
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
            <TouchableOpacity
              onPress={handleDeckCreation}
              style={[styles.button]}>
              <Text style={[styles.buttonText]}> Add deck </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.subTitle}>Decks</Text>

          <View>{displayDecks()}</View>
        </View>
      </View>
    )
  }
}

export default DecklistScreen

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  subTitle: {
    paddingVertical: 24,
    fontSize: 18,
    textAlign: "center",
  },
  deckForm: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
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
  },
  container: {
    padding: 12,
    paddingTop: 64,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 14,
  },
  button: {
    backgroundColor: colors.darkBlue,
    width: "auto",
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
  },
})
