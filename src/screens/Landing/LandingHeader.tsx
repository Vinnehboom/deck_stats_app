import React, { useContext } from "react";
import { Box, Image } from "native-base";

import { Text } from "../../components/layout/Text";
import { LandingScreenStyle } from "../../styles/LandingScreenStyle";
import { TranslationContext } from "../../contexts/TranslationContext";
export const LandingHeader = () => {
  const { t } = useContext(TranslationContext);
  return (
    <Box style={LandingScreenStyle.logoContainer}>
      <Image style={LandingScreenStyle.logo} alt="VS Log Logo" source={require("../../assets/images/logo_light_no_bg_500.png")} />
      <Text style={LandingScreenStyle.welcome}>{t("LANDING_SCREEN.WELCOME")}</Text>
    </Box>
  );
};
