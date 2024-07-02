import React, { useContext } from "react";
import { Box, Image, Select } from "native-base";
import { TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleUser, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { changeLanguage } from "i18next";

import { Text } from "../../components/layout/Text";
import { LandingScreenStyle } from "../../styles/LandingScreenStyle";
import { TranslationContext } from "../../contexts/TranslationContext";
import { Colors } from "../../styles/variables";
import { RootStackParamList } from "../../types/RouteParams";
import { getSelectedLocale, defaultLocale } from "../../helpers/locales";

export const LandingHeader = () => {
  const { t, locale } = useContext(TranslationContext);
  const { push } = useNavigation<StackNavigationProp<RootStackParamList>>();
  const selectedLocale = getSelectedLocale(locale);

  return (
    <Box style={LandingScreenStyle.logoContainer}>
      <Box style={LandingScreenStyle.languagePickerContainer}>
        <Select
          borderWidth={0}
          style={LandingScreenStyle.languagePicker}
          selectedValue={selectedLocale || defaultLocale}
          dropdownIcon={<FontAwesomeIcon icon={faGlobe} color={Colors["primary-dark"]} />}
          onValueChange={value => changeLanguage(value)}>
          <Select.Item label="En" value="en" />
          <Select.Item label="Es" value="es" />
          <Select.Item label="Fr" value="fr" />
        </Select>
      </Box>
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
