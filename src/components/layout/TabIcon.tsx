import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import { Colors } from "../../styles/variables";

export const TabIcon = (focused: boolean, icon: IconDefinition) => (
  <FontAwesomeIcon color={focused ? Colors["primary-dark"] : Colors.light} icon={icon} />
);
