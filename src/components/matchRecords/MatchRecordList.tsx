import React, { memo, useContext, useEffect } from "react";
import { FlatList } from "native-base";

import { MatchRecordListItem } from "./MatchRecordListItem";
import { MatchRecord } from "../../types";
import { ExportRecordsContext } from "../../contexts/decks/ExportRecordsContext";

const RecordList = ({
  matchRecords,
  iconSize,
  width,
  viewableItems,
}: {
  matchRecords: MatchRecord[];
  iconSize?: string;
  width?: "string";
  viewableItems?: boolean;
  exportable?: boolean;
}) => {
  const { selectedItems } = useContext(ExportRecordsContext);

  useEffect(() => {}, [selectedItems]);

  return (
    <FlatList
      width={width || viewableItems ? "85%" : "75%"}
      data={matchRecords}
      alignSelf="center"
      keyExtractor={item => item.id}
      renderItem={({ item }: { item: MatchRecord }) => {
        return (
          <MatchRecordListItem
            matchRecord={item}
            selected={selectedItems.map(selectedItem => selectedItem.id).includes(item.id)}
            view={viewableItems}
            iconSize={iconSize}
          />
        );
      }}
    />
  );
};

export const MatchRecordList = memo(RecordList);
