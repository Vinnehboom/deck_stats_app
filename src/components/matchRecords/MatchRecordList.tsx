import React from "react";
import { FlatList } from "native-base";

import { MatchRecordListItem } from "./MatchRecordListItem";
import { MatchRecord } from "../../types";

export const MatchRecordList = ({
  matchRecords,
  iconSize,
  width,
  viewableItems,
}: {
  matchRecords: MatchRecord[];
  iconSize?: string;
  width?: "string";
  viewableItems?: boolean;
}) => {
  return (
    <FlatList
      width={width || viewableItems ? "85%" : "75%"}
      data={matchRecords}
      alignSelf="center"
      keyExtractor={item => item.id}
      renderItem={({ item }: { item: MatchRecord }) => (
        <MatchRecordListItem matchRecord={item} view={viewableItems} iconSize={iconSize} />
      )}
    />
  );
};
