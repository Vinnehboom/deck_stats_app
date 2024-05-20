import { Box, HStack, Button } from "native-base";
import React, { useContext } from "react";
import { showMessage } from "react-native-flash-message";
import { Alert, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { Text } from "../../components/layout/Text";
import { useSetActiveList } from "./_queries/useSetActiveList";
import { ListItemStyle } from "../../styles/lists/ListItemStyle";
import { Deck, List } from "../../types";
import { TranslationContext } from "../../contexts/TranslationContext";
import { useListDeletion } from "./_queries/useListDeletion";
import { Colors } from "../../styles/variables";

export const ListItemHeader = ({ list, deck, activeListId }: { list: List; deck: Deck; activeListId: List["id"] }) => {
  const { t } = useContext(TranslationContext);
  const useListDeletionMutation = useListDeletion(list, recordsDeleted => {
    showMessage({ message: `successfully deleted the list ${recordsDeleted ? "and match records" : ""}!` });
  });
  const listActivationMutation = useSetActiveList(deck, () => {
    showMessage({
      message: t("DECK.DECK_DETAILS.ACTIVE_DECK.SUCCESS"),
      type: "info",
    });
  });

  const handleDeletionWithRecords = () => {
    Alert.alert(
      t("DECK.DECK_LISTS.LIST_DELETION.RECORDS_ALERT.TITLE"),
      t("DECK.DECK_LISTS.LIST_DELETION.RECORDS_ALERT.MESSAGE"),
      [
        {
          text: t("DECK.DECK_LISTS.LIST_DELETION.RECORDS_ALERT.LIST_ONLY"),
          onPress: () => useListDeletionMutation.mutate({ deleteRecords: false, active: list.id === activeListId }),
          style: "cancel",
        },
        {
          text: t("DECK.DECK_LISTS.LIST_DELETION.RECORDS_ALERT.CONFIRM"),
          onPress: () => useListDeletionMutation.mutate({ deleteRecords: true, active: list.id === activeListId }),
        },
      ]
    );
  };

  const handleListDeletion = () => {
    Alert.alert(t("DECK.DECK_LISTS.LIST_DELETION.DELETE_ALERT.TITLE"), t("DECK.DECK_LISTS.LIST_DELETION.DELETE_ALERT.MESSAGE"), [
      {
        text: t("ALERTS.CANCEL"),
        onPress: () => {},
        style: "cancel",
      },
      { text: t("ALERTS.CONFIRM"), onPress: () => handleDeletionWithRecords() },
    ]);
  };

  return (
    <HStack style={ListItemStyle.header}>
      <Box style={ListItemStyle.titleActionBox}>
        {activeListId === list.id ? (
          <Text>{t("DECK.DECK_LISTS.ACTIVE_LIST")}</Text>
        ) : (
          <Button
            style={ListItemStyle.activateButton}
            onPress={() => {
              listActivationMutation.mutate(list);
            }}>
            <Text style={ListItemStyle.activateButtonText}>{t("DECK.DECK_LISTS.SET_ACTIVE")}</Text>
          </Button>
        )}
      </Box>
      <Box style={ListItemStyle.titleBox}>
        <Text style={ListItemStyle.title}>{list.name}</Text>
      </Box>
      <Box style={ListItemStyle.titlePaddingBox}>
        <TouchableOpacity onPress={handleListDeletion}>
          <FontAwesomeIcon style={ListItemStyle.deleteIcon} color={Colors.red} icon={faTrash} />
        </TouchableOpacity>
      </Box>
    </HStack>
  );
};
