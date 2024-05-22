import React from "react";
import { GoogleSignin, GoogleSigninButton as GoogleButton } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { ANDROID_OAUTH_CLIENT_ID } from "@env";

GoogleSignin.configure({
  webClientId: ANDROID_OAUTH_CLIENT_ID,
});

export const GoogleSignInButton = () => {
  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <GoogleButton
      onPress={async () => await onGoogleButtonPress()}
      size={GoogleButton.Size.Standard}
      color={GoogleButton.Color.Light}
    />
  );
};
