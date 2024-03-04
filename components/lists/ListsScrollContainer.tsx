import { FlatList, Animated, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import React, { useRef } from "react";

import { ListItem } from "./ListItem";
import { ListPagination } from "./ListPagination";
import { ListContainerStyle } from "../../styles/lists/ListsContainerStyle";
import { List } from "../../types";

export const ListsScrollContainer = ({ lists }: { lists: List[] }) => {
  const scrollX = useRef(new Animated.Value(0)).current;

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

  return (
    <>
      <FlatList
        data={lists}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={ListContainerStyle.listsContainer}
        snapToAlignment="center"
        onScroll={handleOnScroll}
        viewabilityConfig={viewabilityConfig}
        renderItem={({ item }: { item: List }) => <ListItem list={item} />}
      />
      <ListPagination data={lists} scrollX={scrollX} />
    </>
  );
};
