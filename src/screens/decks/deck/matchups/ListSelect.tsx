import React, { useContext } from "react";
import { HStack, Select } from "native-base";

import { Text } from "../../../../components/layout/Text";
import { DeckMatchupsStyle } from "../../../../styles/decks/DeckMatchupsStyle";
import { Typography, Colors } from "../../../../styles/variables";
import { List } from "../../../../types";
import { TranslationContext } from "../../../../contexts/TranslationContext";
export const ListSelect = ({
  lists,
  selectedList,
  setSelectedList,
}: {
  lists: List[];
  selectedList: string;
  setSelectedList: (l: string) => void;
}) => {
  const { t } = useContext(TranslationContext);
  return (
    <HStack style={DeckMatchupsStyle.listSelect}>
      <Text style={DeckMatchupsStyle.listSelectTitle}>{t("DECK.DECK_MATCHUPS.LIST")}</Text>
      <Select
        minWidth="60%"
        marginLeft="1%"
        fontSize={Typography.fontSizes.md}
        bgColor={Colors.light}
        onValueChange={value => setSelectedList(value)}
        selectedValue={selectedList}>
        <Select.Item minWidth="full" label={t("DECK.DECK_MATCHUPS.ALL_LISTS")} value="" />
        {lists && lists.map(list => <Select.Item minWidth="full" key={`select-${list.id}`} label={list.name} value={list.id} />)}
      </Select>
    </HStack>
  );
};
