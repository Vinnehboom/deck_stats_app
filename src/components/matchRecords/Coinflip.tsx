import React from "react";
import { HStack, Image } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import { DimensionValue, StyleProp, ViewStyle } from "react-native";

import { MatchRecordListItemStyle } from "../../styles/matchRecords/MatchRecordListItemStyle";
MatchRecordListItemStyle;

export const Coinflip = ({
  won,
  paddingTop,
  containerStyle,
}: {
  won: boolean;
  paddingTop?: DimensionValue;
  containerStyle?: StyleProp<ViewStyle>;
}) => {
  return (
    <HStack space={1} alignItems="center" style={containerStyle} paddingTop={paddingTop}>
      <Image style={MatchRecordListItemStyle.coinflip} alt="coin-flip" source={require("../../assets/images/coin_icon.png")} />
      <FontAwesomeIcon icon={won ? faCheck : faXmark} />
    </HStack>
  );
};
