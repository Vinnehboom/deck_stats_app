import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import { colors } from "../../utils/colors";

export const TabIcon = (focused: boolean, icon: IconDefinition) => (
  <FontAwesomeIcon color={focused ? colors.light : colors["primary-dark"]} icon={icon} />
);
