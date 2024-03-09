import React, { memo } from "react";
import { Box } from "native-base";

import { List, Deck } from "../../types";
import { ListItemStyle } from "../../styles/lists/ListItemStyle";
import { ListItemHeader } from "./ListItemHeader";
import { ListItemBody } from "./ListItemBody";

const ListItem = ({ list, deck, activeListId }: { list: List; deck: Deck; activeListId: List["id"] }) => {
  return (
    <Box style={ListItemStyle.container}>
      <ListItemHeader activeListId={activeListId} deck={deck} list={list} />
      <ListItemBody list={list} />
    </Box>
  );
};

const memoizedListItem = memo(ListItem);
export { memoizedListItem as ListItem };
