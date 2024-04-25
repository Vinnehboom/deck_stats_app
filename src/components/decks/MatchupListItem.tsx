import { HStack, Box } from "native-base";
import React, { useContext, useEffect, useRef, useState } from "react";

import { Text } from "../../components/layout/Text";
import { ArchetypeIcons } from "./ArchetypeIcons";
import { ArchetypeBase } from "../../types";
import { MatchRecordDataEntry } from "../../types/MatchRecord";
import { Colors } from "../../styles/variables";
import { MatchupsContext } from "../../contexts/decks/MatchupsContext";

export const MatchupListItem = ({
  archetype,
  viewable,
  data,
}: {
  archetype: ArchetypeBase;
  viewable: boolean;
  data: MatchRecordDataEntry;
}) => {
  const { bo3 } = useContext(MatchupsContext);
  const [showPercentage, setShowPercentage] = useState(true);
  const leftColumnAttr = useRef<"coinFlipWon" | "first">(bo3 ? "coinFlipWon" : "first");
  const rightColumnAttr = useRef<"coinFlipLost" | "second">(bo3 ? "coinFlipLost" : "second");
  const { baseNegativeColorHue, basePositiveColorHue } = Colors;

  useEffect(() => {
    leftColumnAttr.current = bo3 ? "coinFlipWon" : "first";
    rightColumnAttr.current = bo3 ? "coinFlipLost" : "second";
  }, [bo3]);

  const baseFirstColor =
    data[leftColumnAttr.current]?.wr && data[leftColumnAttr.current].wr > 50 ? basePositiveColorHue : baseNegativeColorHue;
  const baseSecondColor =
    data[rightColumnAttr.current]?.wr && data[rightColumnAttr.current].wr > 50 ? basePositiveColorHue : baseNegativeColorHue;
  const firstColor = data[leftColumnAttr.current].wr
    ? `hsl(${baseFirstColor}, 100%, ${100 - Math.abs(100 - data[leftColumnAttr.current].wr - 50)}%)`
    : Colors.lightGrey;
  const secondColor = data[rightColumnAttr.current].wr
    ? `hsl(${baseSecondColor}, 100%, ${100 - Math.abs(100 - data[rightColumnAttr.current].wr - 50)}%)`
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
          {data[leftColumnAttr.current].wr !== null
            ? showPercentage
              ? `${data[leftColumnAttr.current].wr.toFixed(2)}%`
              : `${data[leftColumnAttr.current].wins}/${data[leftColumnAttr.current].losses}/${data[leftColumnAttr.current].ties}`
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
          {data[rightColumnAttr.current].wr !== null
            ? showPercentage
              ? `${data[rightColumnAttr.current].wr.toFixed(2)}%`
              : `${data[rightColumnAttr.current].wins}/${data[rightColumnAttr.current].losses}/${
                  data[rightColumnAttr.current].ties
                }`
            : "/"}{" "}
        </Text>
      </Box>
    </HStack>
  );
};
