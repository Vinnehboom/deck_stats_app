import React, { useContext } from "react";
import { Alert } from "react-native";
import { HStack, Box } from "native-base";
import { showMessage } from "react-native-flash-message";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { Text } from "../../components/layout/Text";
import { TranslationContext } from "../../contexts/TranslationContext";
import { User } from "../../types";
import { RootStackParamList } from "../../types/RouteParams";
import { Header } from "../../components/layout/Header";
import { Button } from "../../components/layout/Button";
import { AccountStyle } from "../../styles/users/AccountStyle";

export const Account = () => {
  const { t } = useContext(TranslationContext);
  const user = auth().currentUser;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleSignOut = () => {
    auth()
      .signOut()
      .then(() => {
        showMessage({
          message: t("ACCOUNT.SIGNED_OUT"),
          type: "info",
        });
        navigation.replace("Login", undefined);
      })
      .catch(error => {
        showMessage({
          message: `${error.message}`,
          type: "warning",
        });
      });
  };
  const handleUserDelete = (targetUser: User) => {
    Alert.alert(t("ACCOUNT.USER_DELETE.TITLE"), t("ACCOUNT.USER_DELETE.MESSAGE"), [
      {
        text: t("DECK.DECK_DETAILS.ACTIVE_DECK.CANCEL"),
        onPress: () => {},
        style: "cancel",
      },
      {
        text: t("ACCOUNT.USER_DELETE.CONFIRM"),
        onPress: () => {
          targetUser.delete().then(() => {
            showMessage({
              message: t("ACCOUNT.USER_DELETE.SUCCESS"),
            });
            navigation.replace("Login", undefined);
          });
        },
      },
    ]);
  };
  return (
    <Box style={AccountStyle.container}>
      <Box>
        <Header header="h2">
          <Text>{t("ACCOUNT.DETAILS")}</Text>
        </Header>
        <HStack style={AccountStyle.details} space={3}>
          <Text fontWeight="bold">{t("ACCOUNT.EMAIL")}:</Text>
          <Text>{user?.email}</Text>
        </HStack>
        <Header header="h4" alignSelf="center">
          <Text fontWeight="bold">{t("ACCOUNT.EMAIL_DISCLAIMER")}</Text>
        </Header>
        <Button style={AccountStyle.signOutButton} text={t("ACCOUNT.SIGN_OUT")} colorScheme="warning" onPress={handleSignOut} />
      </Box>
      <Box>
        <Header header="h2">
          <Text>{t("ACCOUNT.USER_DELETE.BUTTON")}</Text>
        </Header>
        <Button
          text={t("ACCOUNT.DELETE_ACCOUNT")}
          alignSelf="center"
          onPress={() => handleUserDelete(user!)}
          colorScheme="danger"
        />
      </Box>
    </Box>
  );
};
