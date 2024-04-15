import React from "react";
import { Image } from "native-base";
import { useTranslation } from "react-i18next";

import { Text } from "../../components/layout/Text";
import { LandingScreenStyle } from "../../styles/LandingScreenStyle";
export const LandingHeader = () => {
  const { t } = useTranslation();
  return (
    <>
      <Image style={LandingScreenStyle.logo} alt="VS Log Logo" source={require("../../assets/images/logo_light_no_bg_500.png")} />
      <Text style={LandingScreenStyle.welcome}>{t("LANDING_SCREEN.WELCOME")}</Text>
    </>
  );
};
