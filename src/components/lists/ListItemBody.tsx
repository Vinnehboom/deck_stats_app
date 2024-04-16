import React, { useContext, useState } from "react";
import { HStack, View, Box, Button, Center } from "native-base";

import { Text } from "../../components/layout/Text";
import { CardListImage } from "./cardLists/CardListImage";
import { List, CardList, CardListItem } from "../../types";
import { ListItemStyle } from "../../styles/lists/ListItemStyle";
import { TranslationContext } from "../../contexts/TranslationContext";

export const ListItemBody = ({ list }: { list: List }) => {
  const cards = list?.cards;
  const [display, setDisplay] = useState<"list" | "image">("list");
  const { t } = useContext(TranslationContext);

  const renderImages = ({ cardList, columnLength }: { cardList: CardList; columnLength: number }) => {
    let column: CardListItem[] = [];
    const imageColumns: CardListItem[][] = [];

    const lastItem = cardList.at(-1);
    cardList.forEach((cardListItem: CardListItem) => {
      column.push(cardListItem);
      if (column.length === columnLength || cardListItem === lastItem) {
        imageColumns.push(column);
        column = [];
      }
    });
    return (
      <View style={ListItemStyle.imageContainer}>
        {imageColumns.map((kolumn, count) => (
          <HStack margin={1} space={1} key={count}>
            {kolumn.map((cardListItem, kount) => (
              <CardListImage key={kount} count={cardListItem.count} card={cardListItem.card} />
            ))}
          </HStack>
        ))}
      </View>
    );
  };

  const renderList = (cardList: CardList) => {
    const renderedList: React.JSX.Element[] = cardList.map((cardListItem, index) => {
      const { count, card } = cardListItem;
      return (
        <Box key={index}>
          <HStack style={ListItemStyle.listLine}>
            <Text style={ListItemStyle.listLineCount}>{count}</Text>
            <Text style={ListItemStyle.listLineName}>{card.name}</Text>
            <Text style={ListItemStyle.listLineSet}>
              {card.setId} {card.setNumber}
            </Text>
          </HStack>
        </Box>
      );
    });
    return renderedList;
  };

  return (
    <Box style={ListItemStyle.item}>
      <HStack>
        <Box padding={4} minWidth="50%">
          <Button
            onPress={() => setDisplay("list")}
            style={display === "list" ? ListItemStyle.activeTabButton : ListItemStyle.inactiveTabButton}>
            <Center>
              <Text style={display === "list" ? ListItemStyle.activeTabButtonText : ListItemStyle.inactiveTabButtonText}>
                {t("LIST.ITEM.LIST")}
              </Text>
            </Center>
          </Button>
        </Box>
        <Box padding={4} minWidth="50%">
          <Button
            onPress={() => setDisplay("image")}
            style={display === "image" ? ListItemStyle.activeTabButton : ListItemStyle.inactiveTabButton}>
            <Center>
              <Text style={display === "image" ? ListItemStyle.activeTabButtonText : ListItemStyle.inactiveTabButtonText}>
                {t("LIST.ITEM.IMAGES")}
              </Text>
            </Center>
          </Button>
        </Box>
      </HStack>

      {display === "image" ? renderImages({ cardList: cards, columnLength: 4 }) : renderList(cards)}
    </Box>
  );
};
