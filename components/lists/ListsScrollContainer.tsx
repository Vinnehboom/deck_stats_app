import React, { useRef, useState, useEffect } from "react";
import { FlatList, Animated, NativeSyntheticEvent, NativeScrollEvent } from "react-native";

import { ListItem } from "./ListItem";
import { ListPagination } from "./ListPagination";
import { ListContainerStyle } from "../../styles/lists/ListsContainerStyle";
import { Deck, List } from "../../types";

export const ListsScrollContainer = ({ lists, deck }: { lists: List[]; deck: Deck }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeListId, setActiveListId] = useState<string | undefined>(deck.activeListId);
  const sortedLists = useRef<List[]>(lists);

  const handleOnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      }
    )(event);
  };

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 }).current;

  useEffect(() => {
    const activeList = lists.find(list => list.id === deck.activeListId);
    if (activeList) {
      const activeListIndex = lists.indexOf(activeList);
      lists.splice(activeListIndex, 1)[0];
      lists.unshift(activeList);
      sortedLists.current = lists;
    }
  }, [activeListId, lists, deck.activeListId]);

  return (
    <>
      <FlatList
        data={sortedLists.current}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={ListContainerStyle.listsContainer}
        snapToAlignment="center"
        onScroll={handleOnScroll}
        viewabilityConfig={viewabilityConfig}
        renderItem={({ item }: { item: List }) => (
          <ListItem activeListId={activeListId ?? ""} setActiveListId={setActiveListId} deck={deck} list={item} />
        )}
      />
      <ListPagination data={sortedLists.current} scrollX={scrollX} />
    </>
  );
};
