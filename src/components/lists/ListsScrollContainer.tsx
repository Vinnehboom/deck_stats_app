import React, { useRef, useState, useEffect, ReactNode } from "react";
import { FlatList, Animated, NativeSyntheticEvent, NativeScrollEvent } from "react-native";

import { ListItem } from "./ListItem";
import { ListPagination } from "./ListPagination";
import { ListContainerStyle } from "../../styles/lists/ListsContainerStyle";
import { Deck, List } from "../../types";
import { Spinner } from "../Spinner";

export const ListsScrollContainer = ({
  lists,
  deck,
  activeList,
  loading,
  header,
  footer,
}: {
  lists: List[];
  deck: Deck;
  activeList: List | undefined;
  loading?: boolean;
  footer?: ReactNode;
  header?: ReactNode;
}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const sortedLists = useRef<List[]>(lists);
  const [sorting, setSorting] = useState(false);

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
    const aktiveList = lists.find(list => list.id === activeList?.id);
    setSorting(true);
    if (aktiveList) {
      const activeListIndex = lists.indexOf(aktiveList);
      lists.splice(activeListIndex, 1)[0];
      lists.unshift(aktiveList);
      sortedLists.current = lists;
    }
    setSorting(false);
  }, [lists, activeList, sortedLists, sorting]);

  if (sorting || loading) <Spinner marginTop={24} height={100} />;

  return (
    <>
      <FlatList
        data={sortedLists.current}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={ListContainerStyle.listsContainer}
        snapToAlignment="center"
        ListHeaderComponent={header ? header : null}
        ListFooterComponent={footer ? footer : null}
        onScroll={handleOnScroll}
        viewabilityConfig={viewabilityConfig}
        renderItem={({ item }: { item: List }) => <ListItem activeListId={activeList?.id ?? ""} deck={deck} list={item} />}
      />
      <ListPagination data={sortedLists.current} scrollX={scrollX} />
    </>
  );
};
