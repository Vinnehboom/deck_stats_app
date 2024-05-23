import React from "react";
import { AppleButton, appleAuth } from "@invertase/react-native-apple-authentication";
import auth from "@react-native-firebase/auth";

import { LoginScreenStyle } from "../../styles/login/LoginScreenStyle";

export const AppleSignInButton = () => {
  async function onAppleButtonPress() {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    const { identityToken, nonce } = appleAuthRequestResponse;

    if (identityToken) {
      const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

      const userCredential = await auth().signInWithCredential(appleCredential);

      console.warn(`Firebase authenticated via Apple, UID: ${userCredential.user.uid}`);
    } else {
      // handle this - retry?
    }
  }

  return (
    <AppleButton
      buttonStyle={AppleButton.Style.DEFAULT}
      buttonType={AppleButton.Type.SIGN_IN}
      style={LoginScreenStyle.appleSignInButton}
      onPress={async () => await onAppleButtonPress()}
    />
  );
};
