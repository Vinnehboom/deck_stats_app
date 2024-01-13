import React, { useState, useEffect } from "react"
import {
  Text,
  View,
  StyleSheet,
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
import { Container, Input, TextArea } from "native-base"
import { ListItem } from "../../../components/ListItem"

const DecklistList = () => {
  const { params } = useRoute<RouteProp<DeckListTabParamsType, "Params">>()
  const { deck } = params
  const [lists, setLists] = useState<List[]>([])
  const [listsAdded, setListsAdded] = useState<number>(1)
  const [listString, setListString] = useState("")
  const [listName, setListName] = useState("")
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
  }, [deck, listsAdded])

  const representLists = () => {
    return lists.map((list: List) => <ListItem list={list} />)
  }

  const handleListSubmission = () => {
    const [cardList, errors] = transformList(listString)
    const list: List = {
      name: listName,
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
          setListsAdded(listsAdded + 1)
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
              <Text style={styles.title}> Import list</Text>
              <Input
                editable
                placeholder="name"
                value={listName}
                onChangeText={text => setListName(text)}
                style={styles.listForm.formField}
              />
              <TextArea
                placeholder="import"
                autoCompleteType
                h={200}
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
    minHeight: "45%",
    formField: {
      minWidth: "100%",
      backgroundColor: "white",
      paddingHorizontal: 5,
      paddingVertical: 5,
      borderRadius: 5,
      fontSize: 16,
      height: "80%",
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
