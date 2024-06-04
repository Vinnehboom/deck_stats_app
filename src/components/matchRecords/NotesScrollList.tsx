import React, { useContext } from "react";
import { FlatList, Platform, StyleSheet } from "react-native";
import { Box, Button, Spinner } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import { MatchupNote } from "./MatchupNote";
import { Header } from "../layout/Header";
import { ArchetypeBase, Deck, MatchRecord } from "../../types";
import { useInfiniteDeckMatchUpRecords } from "./_queries/useInfiniteDeckMatchUpRecords";
import { Spacing, Colors } from "../../styles/variables";
import { TranslationContext } from "../../contexts/TranslationContext";

export const NotesScrollList = ({
  title,
  deck,
  opponentArchetype,
  favorite,
}: {
  title: string;
  deck: Deck;
  opponentArchetype: ArchetypeBase;
  favorite?: boolean;
}) => {
  const { data, onEndReached, isFetching, hasNextPage } = useInfiniteDeckMatchUpRecords({
    deck,
    opponentArchetype,
    limit: 2,
    favorite,
  });

  const { t } = useContext(TranslationContext);

  const parseData = (records: MatchRecord[]) => {
    return favorite
      ? records?.filter(record => record.remarks.length > 0)
      : records?.filter(record => record.remarks.length > 0 && !record?.favorite);
  };

  return (
    <Box
      style={
        favorite ? [NotesScrollListStyle.container, NotesScrollListStyle.favoriteBackground] : NotesScrollListStyle.container
      }>
      <Header header="h2">{title}</Header>
      <FlatList
        renderItem={({ item: record }: { item: MatchRecord }) => <MatchupNote record={record} />}
        keyExtractor={item => item.id}
        initialNumToRender={4}
        onEndReached={onEndReached}
        removeClippedSubviews={true}
        data={parseData(data)}
        ListFooterComponent={
          parseData(data).length > 0 && isFetching ? (
            <Spinner height={100} />
          ) : hasNextPage ? (
            <Box alignSelf="center">
              {Platform.OS === "android" ? (
                <Button variant="link" fontWeight="bold" onPress={onEndReached}>
                  {t("MATCHUP_NOTES.REMOVE.REMOVED")}
                </Button>
              ) : (
                <FontAwesomeIcon icon={faCaretDown} size={16} />
              )}
            </Box>
          ) : null
        }
        ListEmptyComponent={isFetching ? <Spinner height={100} /> : null}
      />
    </Box>
  );
};

export const NotesScrollListStyle = StyleSheet.create({
  container: { flex: 1, height: "43%", paddingBottom: Spacing.md },
  favoriteBackground: {
    backgroundColor: Colors.light,
    borderColor: "#000000",
    shadowColor: Colors["primary-dark"],
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});
