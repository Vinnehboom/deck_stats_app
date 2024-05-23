import React, { useContext } from "react";
import { Alert } from "react-native";
import { HStack, Box } from "native-base";
import { showMessage } from "react-native-flash-message";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { appleAuth } from "@invertase/react-native-apple-authentication";

import { Text } from "../../components/layout/Text";
import { TranslationContext } from "../../contexts/TranslationContext";
import { User } from "../../types";
import { RootStackParamList } from "../../types/RouteParams";
import { Header } from "../../components/layout/Header";
import { Button } from "../../components/layout/Button";
import { AccountStyle } from "../../styles/users/AccountStyle";
import { vsLogUserEmailString } from "../../helpers/login";

async function revokeSignInWithAppleToken() {
  const { authorizationCode } = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.REFRESH,
  });
  if (!authorizationCode) {
    console.error("Apple Revocation failed - no authorizationCode returned");
    return;
  }

  return auth().revokeToken(authorizationCode);
}

export const Account = () => {
  const { t } = useContext(TranslationContext);
  const user = auth().currentUser;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const username = user?.email?.includes(vsLogUserEmailString);

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
          const promise =
            targetUser.providerData[0].providerId === "apple.com"
              ? revokeSignInWithAppleToken().then(() => targetUser.delete())
              : targetUser.delete();
          promise.then(() => {
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
          <Text fontWeight="bold">{username ? t("ACCOUNT.USERNAME") : t("ACCOUNT.EMAIL")}:</Text>
          <Text>{username ? user?.email?.replace(vsLogUserEmailString, "") : user?.email}</Text>
        </HStack>
        <Header w="75%" header="h4" alignSelf="center">
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
