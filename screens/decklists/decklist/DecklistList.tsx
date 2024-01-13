import React, { useState, useEffect } from "react"
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native"
import { colors } from "../../../utils/colors"
import { transformList } from "../../../helpers/decklists"
import firestore from "@react-native-firebase/firestore"
import { showMessage } from "react-native-flash-message"
import { Spinner } from "../../../components/Spinner"
import { List } from "../../../types"
import { RouteProp, useRoute } from "@react-navigation/native"
import { DeckListTabParamsType } from "../../../types/RouteParams"
import { v4 as uuidv4 } from "uuid"
import { Container } from "native-base"
import { ListItem } from "../../../components/ListItem"

const DecklistList = () => {
  const { params } = useRoute<RouteProp<DeckListTabParamsType, "Params">>()
  const { deck } = params
  const [lists, setLists] = useState<List[]>([])
  const [listString, setListString] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getLists = async () => {
      let snapshot = await firestore()
        .collection("Lists")
        .where("deckId", "==", deck.id)
        .get()
      let data = snapshot.docs.map(doc => doc.data()) as List[]
      setLists(data)
    }

    setLoading(true)
    getLists()
    setLoading(false)
  }, [deck])

  const representLists = () => {
    return lists.map((list: List) => <ListItem list={list} />)
  }

  const handleListSubmission = () => {
    const [cardList, errors] = transformList(listString)
    const list: List = {
      id: uuidv4(),
      deckId: deck.id,
      cards: cardList,
    }
    if (errors.length > 0) {
      const errorString = errors.join(", ")
      showMessage({
        message: `Some errors were encountered during list submission: ${errorString}`,
        type: "warning",
      })
    } else {
      firestore()
        .collection("Lists")
        .add(list)
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
      <Container style={styles.container}>
        <View style={styles.scrollContainer}>
          <ScrollView>
            <View style={styles.listForm}>
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
            <View style={styles.listsContainer}>{representLists()}</View>
            <View />
          </ScrollView>
        </View>
      </Container>
    )
  }
}

export default DecklistList

const styles = StyleSheet.create({
  scrollContainer: { flexShrink: 1 },
  listsContainer: { width: "80%" },
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
    minWidth: "100%",
    alignItems: "center",
    marginBottom: -50,
    maxHeight: "75%",
    formField: {
      minWidth: "100%",
      backgroundColor: "white",
      paddingHorizontal: 5,
      paddingVertical: 5,
      borderRadius: 5,
      fontSize: 16,
      height: "60%",
    },
  },
  container: {
    minWidth: "100%",
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
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
    marginTop: 20,
    alignItems: "center",
    borderRadius: 10,
  },
})
