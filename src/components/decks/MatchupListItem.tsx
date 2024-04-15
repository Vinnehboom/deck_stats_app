import { HStack, Box } from "native-base";
import React, { useState } from "react";

import { Text } from "../../components/layout/Text";
import { ArchetypeIcons } from "./ArchetypeIcons";
import { ArchetypeBase } from "../../types";
import { MatchRecordDataEntry } from "../../types/MatchRecord";
import { Colors } from "../../styles/variables";

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
  const { baseNegativeColorHue, basePositiveColorHue } = Colors;
  const baseFirstColor = data.first.wr && data.first.wr > 50 ? basePositiveColorHue : baseNegativeColorHue;
  const baseSecondColor = data.second.wr && data.second.wr > 50 ? basePositiveColorHue : baseNegativeColorHue;
  const firstColor = data.first.wr
    ? `hsl(${baseFirstColor}, 100%, ${100 - Math.abs(100 - data.first.wr - 50)}%)`
    : Colors.lightGrey;
  const secondColor = data.second.wr
    ? `hsl(${baseSecondColor}, 100%, ${100 - Math.abs(100 - data.second.wr - 50)}%)`
    : Colors.lightGrey;
  return (
    <HStack onTouchStart={() => setShowPercentage(!showPercentage)}>
      <HStack paddingRight={1} paddingY={1} display="flex" justifyContent="center" width="40%">
        <ArchetypeIcons archetype={archetype} />
      </HStack>
      <Box
        borderTopLeftRadius={5}
        borderBottomLeftRadius={5}
        style={{ backgroundColor: firstColor }}
        width={viewable ? "25%" : "30%"}
        paddingTop={3}>
        <Text textAlign="center">
          {data.first.wr
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
          {data.second.wr
            ? showPercentage
              ? `${data.second.wr.toFixed(2)}%`
              : `${data.second.wins}/${data.second.losses}/${data.second.ties}`
            : "/"}{" "}
        </Text>
      </Box>
    </HStack>
  );
};
