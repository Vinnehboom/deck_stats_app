import React, { useContext } from "react";
import { Image } from "native-base";

import { Text } from "../../components/layout/Text";
import { LandingScreenStyle } from "../../styles/LandingScreenStyle";
import { TranslationContext } from "../../contexts/TranslationContext";
export const LandingHeader = () => {
  const { t } = useContext(TranslationContext);
  return (
    <>
      <Image style={LandingScreenStyle.logo} alt="VS Log Logo" source={require("../../assets/images/logo_light_no_bg_500.png")} />
      <Text style={LandingScreenStyle.welcome}>{t("LANDING_SCREEN.WELCOME")}</Text>
    </>
  );
};
