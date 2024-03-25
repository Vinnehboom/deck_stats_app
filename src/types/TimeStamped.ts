import firestore from "@react-native-firebase/firestore";

export type TimeStamped = {
  createdAt?: firestore.Timestamp;
  updatedAt?: firestore.Timestamp;
};
