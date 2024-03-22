import { HStack, Box } from "native-base";
import React, { useState } from "react";

import { Text } from "../../components/layout/Text";
import { ArchetypeIcons } from "./ArchetypeIcons";
import { ArchetypeBase } from "../../types";
import { MatchRecordDataEntry } from "../../types/MatchRecord";
import { colors } from "../../utils/colors";

export const MatchupListItem = ({
  data,
  archetype,
  viewable,
}: {
  data: MatchRecordDataEntry;
  archetype: ArchetypeBase;
  viewable: boolean;
}) => {
  const [showPercentage, setShowPercentage] = useState(true);
  const firstDataPresent = data.first.wins + data.first.losses !== 0;
  const secondDataPresent = data.second.wins + data.second.losses !== 0;
  const { baseNegativeColorHue, basePositiveColorHue } = colors;
  const baseFirstColor = data.first.wr > 50 ? basePositiveColorHue : baseNegativeColorHue;
  const baseSecondColor = data.second.wr > 50 ? basePositiveColorHue : baseNegativeColorHue;
  const firstColor = firstDataPresent
    ? `hsl(${baseFirstColor}, 100%, ${100 - Math.abs(100 - data.first.wr - 50)}%)`
    : colors.grey;
  const secondColor = secondDataPresent
    ? `hsl(${baseSecondColor}, 100%, ${100 - Math.abs(100 - data.second.wr - 50)}%)`
    : colors.grey;

  return (
    <HStack onTouchStart={() => setShowPercentage(!showPercentage)}>
      <HStack paddingRight={1} paddingY={1} display="flex" justifyContent="flex-end" width="40%">
        <ArchetypeIcons archetype={archetype} />
      </HStack>
      <Box
        borderTopLeftRadius={5}
        borderBottomLeftRadius={5}
        style={{ backgroundColor: firstColor }}
        width={viewable ? "25%" : "30%"}
        paddingTop={3}>
        <Text textAlign="center">
          {firstDataPresent
            ? showPercentage
              ? `${data.first.wr.toFixed(2)}%`
              : `${data.first.wins}/${data.first.losses}/${data.first.ties}`
            : "/"}
        </Text>
      </Box>
      <Box
        style={{ backgroundColor: secondColor }}
        width={viewable ? "25%" : "30%"}
        paddingTop={3}
        borderTopRightRadius={5}
        borderBottomRightRadius={5}>
        <Text textAlign="center">
          {secondDataPresent
            ? showPercentage
              ? `${data.second.wr.toFixed(2)}%`
              : `${data.second.wins}/${data.second.losses}/${data.second.ties}`
            : "/"}{" "}
        </Text>
      </Box>
    </HStack>
  );
};
