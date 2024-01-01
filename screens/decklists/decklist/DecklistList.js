import React, { useState, useEffect, useContext } from "react"
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native"
import { colors } from "../../../utils/colors"
import { transformList } from "../../../helpers/decklists"
import firestore from "@react-native-firebase/firestore"
import { showMessage } from "react-native-flash-message"
import { Spinner } from "../../../components/Spinner"
import DeckContext from "../../../contexts/DeckContext"

const DecklistList = () => {
  const { deck } = useContext(DeckContext)
  const [lists, setLists] = useState([])
  const [listString, setListString] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getLists = async () => {
      let snapshot = await firestore()
        .collection("Lists")
        .where("deckId", "==", deck.id)
        .get()
      let data = snapshot.docs.map(doc => doc.data())
      setLists(data)
    }

    setLoading(true)
    getLists()
    setLoading(false)
  }, [deck])

  const representLists = () => {
    if (Object.keys(lists)[0] !== "") {
      let items = lists.map((list, index) => <Text key={index}>list</Text>)
      return items
    }
  }

  const handleListSubmission = () => {
    const [listObject, errors] = transformList(listString)
    if (errors.length > 0) {
      const errorString = errors.join(", ")
      showMessage({
        message: `Some errors were encountered during list submission: ${errorString}`,
        type: "warning",
      })
    } else {
      firestore()
        .collection("Lists")
        .add({
          deckId: deck.id,
          list: listObject,
        })
        .then(() => {
          showMessage({
            message: "List added!",
            type: "info",
          })
        })
        .catch(e => console.log(e))
      setListString("")
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
      <View>
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
          <TouchableOpacity
            style={styles.button}
            onPress={handleListSubmission}>
            <Text style={styles.buttonText}>Submit list</Text>
          </TouchableOpacity>
        </View>
        <View>{representLists()}</View>
      </View>
    )
  }
}

export default DecklistList

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "600",
    marginVertical: 5,
  },
  subTitle: {
    fontSize: 18,
    textAlign: "center",
  },
  listForm: {
    width: "100%",
    alignItems: "center",
    formField: {
      backgroundColor: "white",
      paddingHorizontal: 5,
      paddingVertical: 5,
      borderRadius: 5,
      fontSize: 14,
      height: "60%",
      marginRight: "5%",
      width: "80%",
    },
  },
  container: {
    padding: 8,
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
