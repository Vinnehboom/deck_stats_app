import { useTranslation } from "react-i18next";
import React from "react";

import { Button } from "../../components/layout/Button";
import { Colors } from "../../styles/variables";
export const LandingFooter = ({ signOut }: { signOut: () => void }) => {
  const { t } = useTranslation();
  return (
    <Button
      marginY={5}
      text={t("LANDING_SCREEN.SIGN_OUT")}
      width="auto"
      alignSelf="center"
      onPress={signOut}
      color={Colors.red}
    />
  );
};
