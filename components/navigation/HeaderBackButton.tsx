import { Button, HStack, ArrowBackIcon, Text } from "native-base";
import { useTranslation } from "react-i18next";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { colors } from "../../utils/colors";

export const HeaderBackButton = () => {
  const { t } = useTranslation();
  const { pop } = useNavigation();
  return (
    <HStack justifyContent="start">
      <Button
        right={3}
        colorScheme="white"
        color={colors.white}
        fontWeight="bold"
        onPress={() => pop()}
        startIcon={<ArrowBackIcon />}>
        <Text color={colors.white}>{t("DECK.NAVIGATION.BACK")}</Text>
      </Button>
    </HStack>
  );
};
