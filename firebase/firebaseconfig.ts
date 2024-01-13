import { Platform } from "react-native";
import firebase from "@react-native-firebase/app";
import "@react-native-firebase/auth";
import {
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
  REACT_APP_IOS_FIREBASE_API_KEY,
  REACT_APP_IOS_FIREBASE_APP_ID,
  REACT_APP_ANDROID_FIREBASE_API_KEY,
  REACT_APP_ANDROID_FIREBASE_APP_ID,
} from "@env";

// Common Firebase Config
const commonFirebaseConfig = {
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
};

// Platform-specific Firebase Config
const platformFirebaseConfig =
  Platform.OS === "ios"
    ? {
        apiKey: REACT_APP_IOS_FIREBASE_API_KEY,
        authDomain: commonFirebaseConfig.authDomain,
        projectId: commonFirebaseConfig.projectId,
        storageBucket: commonFirebaseConfig.storageBucket,
        appId: REACT_APP_IOS_FIREBASE_APP_ID,
      }
    : {
        apiKey: REACT_APP_ANDROID_FIREBASE_API_KEY,
        authDomain: commonFirebaseConfig.authDomain,
        projectId: commonFirebaseConfig.projectId,
        storageBucket: commonFirebaseConfig.storageBucket,
        appId: REACT_APP_ANDROID_FIREBASE_APP_ID,
      };

// Merge common and platform-specific configs
const firebaseConfig = { ...commonFirebaseConfig, ...platformFirebaseConfig };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const authInstance = firebase.auth();

export { authInstance, firebase };
