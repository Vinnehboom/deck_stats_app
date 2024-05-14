import React, { useContext } from "react";
import { Box, Image } from "native-base";
import { TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { Text } from "../../components/layout/Text";
import { LandingScreenStyle } from "../../styles/LandingScreenStyle";
import { TranslationContext } from "../../contexts/TranslationContext";
import { Colors } from "../../styles/variables";
import { RootStackParamList } from "../../types/RouteParams";

export const LandingHeader = () => {
  const { t } = useContext(TranslationContext);
  const { push } = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <Box style={LandingScreenStyle.logoContainer}>
      <Box style={LandingScreenStyle.logOutButton}>
        <TouchableOpacity onPress={() => push("Account")}>
          <FontAwesomeIcon color={Colors["primary-dark"]} size={32} icon={faCircleUser} />
        </TouchableOpacity>
      </Box>

      <Image style={LandingScreenStyle.logo} alt="VS Log Logo" source={require("../../assets/images/logo_light_no_bg_500.png")} />
      <Text style={LandingScreenStyle.welcome}>{t("LANDING_SCREEN.WELCOME")}</Text>
    </Box>
  );
};
