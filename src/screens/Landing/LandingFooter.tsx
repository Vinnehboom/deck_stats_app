import React, { useContext } from "react";

import { Button } from "../../components/layout/Button";
import { Colors } from "../../styles/variables";
import { TranslationContext } from "../../contexts/TranslationContext";
export const LandingFooter = ({ signOut }: { signOut: () => void }) => {
  const { t } = useContext(TranslationContext);
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
