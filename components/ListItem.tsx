import React, { useState } from "react"
import { List, CardList, CardListItem } from "../types"
import { Image, Text, Box, Button, Center, Circle, HStack } from "native-base"
import { colors } from "../utils/colors"

const CardListImage = ({ count, card }: CardListItem) => {
  return (
    <Center w="30%" key={`${card.setId} ${card.setNumber}`}>
      <Circle
        w="10"
        h="10"
        backgroundColor={colors.primary}
        position={"absolute"}
        bottom={"3"}
        zIndex={1}>
        <Text fontSize={"16"}>{count}</Text>
      </Circle>
      <Image
        zIndex={-1}
        source={{
          uri: `https://images.pokemontcg.io/${card.apiSetId}/${card.setNumber}.png`,
        }}
        borderRadius={"5"}
        alt={card.name}
        size={"lg"}
      />
    </Center>
  )
}

export const ListItem = ({ list }: { list: List }) => {
  const cards = list.cards
  const [display, setDisplay] = useState<"list" | "image">("list")

  const toggleDisplay = () => {
    setDisplay(display === "list" ? "image" : "list")
  }
  const renderImages = ({
    cardList,
    columnLength,
  }: {
    cardList: CardList
    columnLength: number
  }) => {
    let column: CardListItem[] = []
    let imageColumns: CardListItem[][]
    imageColumns = []
    cardList.forEach((cardListItem: CardListItem) => {
      column.push(cardListItem)
      if (column.length === columnLength) {
        imageColumns.push(column)
        column = []
      }
    })
    return imageColumns.map((kolumn, count) => (
      <HStack margin={1} space={1} key={count}>
        {kolumn.map((cardListItem, kount) => (
          <CardListImage
            key={kount}
            count={cardListItem.count}
            card={cardListItem.card}
          />
        ))}
      </HStack>
    ))
  }

  const renderList = (cardList: CardList) => {
    const renderedList: Element[] = cardList.map((cardListItem, index) => {
      const { count, card } = cardListItem
      return (
        <Box key={index} minWidth={"100%"}>
          <Text>
            {count} {card.name} {card.setId} {card.setNumber}
          </Text>
        </Box>
      )
    })
    return renderedList
  }

  return (
    <Box backgroundColor={colors.white}>
      <Button
        justifyContent={"center"}
        minWidth="100%"
        onPress={toggleDisplay}
        backgroundColor={
          display === "image" ? colors.primary : colors["primary-dark"]
        }>
        <Center>
          <Text color={colors.light} fontSize={16} justifyContent={"center"}>
            {" "}
            Show {display === "list" ? "images" : "list"}
          </Text>
        </Center>
      </Button>
      {display === "image"
        ? renderImages({ cardList: cards, columnLength: 3 })
        : renderList(cards)}
    </Box>
  )
}
