import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";

import { colors } from "../utils/colors";
import { useAuthContext } from "../contexts/useAuthContext";

export const LandingScreen = () => {
  const { user, signOut } = useAuthContext();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text>
        {t("TYPES.USER.EMAIL")}: {user.email}
      </Text>
      <TouchableOpacity onPress={signOut} style={styles.button}>
        <Text style={styles.buttonText}> {t("LANDING_SCREEN.SIGN_OUT")} </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.darkBlue,
    borderRadius: 10,
    marginTop: 40,
    padding: 15,
    width: "60%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});
