import { HStack, Text } from "native-base";
import React, { useState } from "react";
import { StyleProp, ViewStyle } from "react-native";

import { ArchetypeIcons } from "./ArchetypeIcons";
import { ArchetypeBase } from "../../types";
import { MatchRecordDataEntry } from "../../types/MatchRecord";
import { DeckMatchupsStyle } from "../../styles/decks/DeckMatchupsStyle";
import { colors } from "../../utils/colors";

export const MatchupListItem = ({
  data,
  archetype,
  style,
}: {
  data: MatchRecordDataEntry;
  archetype: ArchetypeBase;
  style: StyleProp<ViewStyle>;
}) => {
  const [showPercentage, setShowPercentage] = useState(true);
  const firstDataPresent = data.first.wins + data.first.losses !== 0;
  const secondDataPresent = data.second.wins + data.second.losses !== 0;
  const baseNegativeColor = "15";
  const basePositiveColor = "210";
  const baseFirstColor = data.first.wr > 50 ? basePositiveColor : baseNegativeColor;
  const baseSecondColor = data.second.wr > 50 ? basePositiveColor : baseNegativeColor;
  const firstColor = firstDataPresent
    ? `hsl(${baseFirstColor}, 100%, ${100 - Math.abs(100 - data.first.wr - 50)}%)`
    : colors.grey;
  const secondColor = secondDataPresent
    ? `hsl(${baseSecondColor}, 100%, ${100 - Math.abs(100 - data.second.wr - 50)}%)`
    : colors.grey;

  return (
    <HStack onTouchStart={() => setShowPercentage(!showPercentage)} style={style}>
      <HStack paddingY={1} display="flex" justifyContent="flex-end" minWidth="40%">
        <ArchetypeIcons archetype={archetype} />
      </HStack>
      <Text style={[DeckMatchupsStyle.matchupText, { backgroundColor: firstColor }]}>
        {firstDataPresent
          ? showPercentage
            ? `${data.first.wr.toFixed(2)}%`
            : `${data.first.wins}/${data.first.losses}/${data.first.ties}`
          : "/"}
      </Text>
      <Text style={[DeckMatchupsStyle.matchupText, { backgroundColor: secondColor }]}>
        {secondDataPresent
          ? showPercentage
            ? `${data.second.wr.toFixed(2)}%`
            : `${data.second.wins}/${data.second.losses}/${data.second.ties}`
          : "/"}{" "}
      </Text>
    </HStack>
  );
};
