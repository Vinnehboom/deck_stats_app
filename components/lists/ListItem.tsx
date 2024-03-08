import React, { useState, memo } from "react";
import { Image, Text, Box, Button, Center, Circle, HStack } from "native-base";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { showMessage } from "react-native-flash-message";

import { useSetActiveList } from "./_queries/useSetActiveList";
import { List, CardList, CardListItem, Deck } from "../../types";
import { colors } from "../../utils/colors";
import { ListItemStyle } from "../../styles/lists/ListItemStyle";
const CardListImage = ({ count, card }: CardListItem) => {
  return (
    <Center style={ListItemStyle.cardImage} key={`${card.setId} ${card.setNumber}`}>
      <Circle w="8" h="8" backgroundColor={colors.primary} position="absolute" bottom="3" zIndex={1}>
        <Text fontSize="14">{count}</Text>
      </Circle>
      <Image
        zIndex={-1}
        source={{
          uri: `https://images.pokemontcg.io/${card.apiSetId}/${card.setNumber}.png`,
        }}
        resizeMode="contain"
        borderRadius="5"
        alt={card.name}
        size={"lg"}
      />
    </Center>
  );
};

const ListItem = ({ list, deck, activeListId }: { list: List; deck: Deck; activeListId: List["id"] }) => {
  const { t } = useTranslation();

  const cards = list?.cards;
  const [display, setDisplay] = useState<"list" | "image">("list");
  const listActivationMutation = useSetActiveList(deck, () => {
    showMessage({
      message: t("DECK.DECK_DETAILS.ACTIVE_DECK.SUCCESS"),
      type: "info",
    });
  });

  const renderImages = ({ cardList, columnLength }: { cardList: CardList; columnLength: number }) => {
    let column: CardListItem[] = [];
    const imageColumns: CardListItem[][] = [];

    cardList.forEach((cardListItem: CardListItem) => {
      column.push(cardListItem);
      if (column.length === columnLength) {
        imageColumns.push(column);
        column = [];
      }
    });
    return imageColumns.map((kolumn, count) => (
      <HStack margin={1} space={1} key={count}>
        {kolumn.map((cardListItem, kount) => (
          <CardListImage key={kount} count={cardListItem.count} card={cardListItem.card} />
        ))}
      </HStack>
    ));
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

  const renderListItem = () => {
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

        {display === "image" ? (
          <View style={ListItemStyle.imageContainer}>{renderImages({ cardList: cards, columnLength: 4 })}</View>
        ) : (
          renderList(cards)
        )}
      </Box>
    );
  };

  return (
    <Box style={ListItemStyle.container}>
      <HStack style={ListItemStyle.header}>
        <Text style={ListItemStyle.titlePaddingBox}>&nbsp;</Text>
        <Box style={ListItemStyle.titleBox}>
          <Text style={ListItemStyle.title}>{list.name}</Text>
        </Box>

        <Box style={ListItemStyle.titleActionBox}>
          {activeListId === list.id ? (
            <Text>Active List</Text>
          ) : (
            <Button
              style={ListItemStyle.activateButton}
              onPress={() => {
                listActivationMutation.mutate(list);
              }}>
              <Text style={ListItemStyle.activateButtonText}>Set active</Text>
            </Button>
          )}
        </Box>
      </HStack>
      {renderListItem()}
    </Box>
  );
};

const memoizedListItem = memo(ListItem);
export { memoizedListItem as ListItem };
