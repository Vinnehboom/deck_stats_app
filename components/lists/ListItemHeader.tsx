import { Box, HStack, Button } from "native-base";
import React from "react";
import { showMessage } from "react-native-flash-message";
import { useTranslation } from "react-i18next";

import { Text } from "../../components/layout/Text";
import { useSetActiveList } from "./_queries/useSetActiveList";
import { ListItemStyle } from "../../styles/lists/ListItemStyle";
import { Deck, List } from "../../types";

export const ListItemHeader = ({ list, deck, activeListId }: { list: List; deck: Deck; activeListId: List["id"] }) => {
  const { t } = useTranslation();
  const listActivationMutation = useSetActiveList(deck, () => {
    showMessage({
      message: t("DECK.DECK_DETAILS.ACTIVE_DECK.SUCCESS"),
      type: "info",
    });
  });
  return (
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
  );
};
