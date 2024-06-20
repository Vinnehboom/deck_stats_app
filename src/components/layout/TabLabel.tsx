import React from "react";

import { TabBarStyle } from "../../styles/layout/TabBarStyle";
import { Text } from "./Text";

export const TabLabel = props => {
  return (
    <Text
      style={props.focused ? [TabBarStyle.label, TabBarStyle.active] : TabBarStyle.label}
      adjustsFontSizeToFit
      numberOfLines={1}>
      {props.children}
    </Text>
  );
};
