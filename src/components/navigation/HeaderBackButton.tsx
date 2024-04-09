import { Button, HStack, ArrowBackIcon } from "native-base";
import { useTranslation } from "react-i18next";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { Text } from "../../components/layout/Text";
import { Colors } from "../../styles/variables";

export const HeaderBackButton = () => {
  const { t } = useTranslation();
  const { pop } = useNavigation();
  return (
    <HStack justifyContent="start">
      <Button
        right={3}
        colorScheme="white"
        color={Colors.white}
        fontWeight="bold"
        onPress={() => pop()}
        startIcon={<ArrowBackIcon />}>
        <Text color={Colors.white}>{t("DECK.NAVIGATION.BACK")}</Text>
      </Button>
    </HStack>
  );
};
