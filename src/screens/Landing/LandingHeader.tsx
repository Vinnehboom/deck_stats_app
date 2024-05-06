import React, { useContext } from "react";
import { Box, Image } from "native-base";
import { TouchableOpacity } from "react-native";

import { Colors } from "../../styles/variables";
import { Text } from "../../components/layout/Text";
import { LandingScreenStyle } from "../../styles/LandingScreenStyle";
import { TranslationContext } from "../../contexts/TranslationContext";
export const LandingHeader = ({ signOut }: { signOut: () => void }) => {
  const { t } = useContext(TranslationContext);
  return (
    <Box style={LandingScreenStyle.logoContainer}>
      <Box style={LandingScreenStyle.logOutButton}>
        <TouchableOpacity>
          <Text fontWeight="bold" onPress={signOut} width="auto" color={Colors.red}>
            {t("LANDING_SCREEN.SIGN_OUT")}
          </Text>
        </TouchableOpacity>
      </Box>

      <Image style={LandingScreenStyle.logo} alt="VS Log Logo" source={require("../../assets/images/logo_light_no_bg_500.png")} />
      <Text style={LandingScreenStyle.welcome}>{t("LANDING_SCREEN.WELCOME")}</Text>
    </Box>
  );
};
