import React, { useContext, useEffect, useRef, useState } from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
import { View, HStack, Image, Box, ScrollView } from "native-base";
import { Alert } from "react-native";
import { captureRef } from "react-native-view-shot";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDownload, faShare } from "@fortawesome/free-solid-svg-icons";

import { RootStackParamList } from "../../types/RouteParams";
import { ArchetypeIcons } from "../../components/decks/ArchetypeIcons";
import { MatchRecord } from "../../types";
import { Text } from "../../components/layout/Text";
import { isId, matchLost, matchWon } from "../../helpers/matchRecords";
import { Button } from "../../components/layout/Button";
import { MatchExportStyle } from "../../styles/exports/MatchExportStyle";
import { Typography } from "../../styles/variables";
import { TranslationContext } from "../../contexts/TranslationContext";
import { Coinflip } from "../../components/matchRecords/Coinflip";
import { ShareImage } from "../../helpers/exports/ShareImage";

export const MatchExport = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, "MatchExport">>();
  const { t } = useContext(TranslationContext);
  const { matchupRecords } = params;
  const archetype = matchupRecords[0].deckArchetype;
  const total = matchupRecords.length;
  const [sortedMatchRecords, setSortedMatchRecords] = useState<MatchRecord[]>([]);
  const [scores, setScores] = useState<string[]>([]);
  const [resultString, setResultString] = useState("");
  const viewRef = useRef();

  useEffect(() => {
    setSortedMatchRecords(matchupRecords.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)));
    let wins = 0;
    let losses = 0;
    let ties = 0;
    const roundScores: string[] = [];
    sortedMatchRecords.reverse().forEach(record => {
      matchWon(record) ? wins++ : matchLost(record) ? losses++ : ties++;
      roundScores.push(`${wins}-${losses}-${ties}`);
    });
    setScores(roundScores.reverse());
    setResultString(`${wins}-${losses}-${ties}`);
  }, [matchupRecords, sortedMatchRecords]);

  const downloadImage = async () => {
    try {
      const uri = await captureRef(viewRef, {
        format: "jpg",
        quality: 0.8,
      });

      const image = await CameraRoll.save(uri, "photo");
      if (image) {
        Alert.alert("", t("MATCH_EXPORT.DOWNLOAD_SUCCESS"), [{ text: "OK", onPress: () => {} }], { cancelable: false });
      }
    } catch (error) {
      console.log(t("MATCH_EXPORT.DOWNLOAD_ERROR"), error);
    }
  };

  return (
    <View style={MatchExportStyle.container}>
      <HStack alignSelf="center" space={4} paddingTop={2}>
        <Button
          leftIcon={<FontAwesomeIcon color="white" icon={faDownload} />}
          fontSize={Typography.fontSizes.sm}
          text={t("MATCH_EXPORT.DOWNLOAD")}
          onPress={async () => await downloadImage()}
        />
        <Button
          leftIcon={<FontAwesomeIcon color="white" icon={faShare} />}
          fontSize={Typography.fontSizes.sm}
          text={t("MATCH_EXPORT.SHARE")}
          onPress={async () => await ShareImage(viewRef)}
        />
      </HStack>
      <ScrollView style={MatchExportStyle.scrollContainer}>
        <View collapsable={false} style={MatchExportStyle.imageContainer} ref={viewRef}>
          <Box>
            <Image
              style={MatchExportStyle.logo}
              alt="VS Log Logo"
              source={require("../../assets/images/logo_light_no_bg_500.png")}
            />
            <Text style={MatchExportStyle.waterMark}>{t("MATCH_EXPORT.WATERMARK")}</Text>
            <HStack
              width="60%"
              alignSelf="center"
              alignItems="center"
              style={MatchExportStyle.header}
              justifyContent="space-around">
              <HStack
                width="60%"
                alignSelf="center"
                alignItems="center"
                style={MatchExportStyle.header}
                justifyContent="space-around">
                <ArchetypeIcons archetype={archetype} />
                <Text style={MatchExportStyle.number}>{resultString}</Text>
              </HStack>
            </HStack>
          </Box>
          {sortedMatchRecords.reverse().map((item: MatchRecord, index: number) => (
            <HStack
              key={`item ${index}`}
              style={[
                MatchExportStyle.matchupContainer,
                matchWon(item) ? MatchExportStyle.win : matchLost(item) ? MatchExportStyle.loss : MatchExportStyle.tie,
              ]}>
              <Text style={MatchExportStyle.roundNumber}>{total - index}</Text>
              <Text
                style={[
                  MatchExportStyle.result,
                  matchWon(item) ? MatchExportStyle.win : matchLost(item) ? MatchExportStyle.loss : MatchExportStyle.tie,
                ]}>
                {item.result}
              </Text>
              <HStack space={3} style={MatchExportStyle.opponentArchetype}>
                <ArchetypeIcons archetype={item.opponentArchetype} />
              </HStack>
              {!isId(item) ? (
                item.bo3 ? (
                  <Coinflip won={item.coinFlipWon || false} />
                ) : (
                  <Text style={MatchExportStyle.result}>
                    {item.gamesStarted[0] ? t("MATCH_RECORD.FIRST") : t("MATCH_RECORD.SECOND")}
                  </Text>
                )
              ) : null}
              <Text style={MatchExportStyle.score}>{scores[index]}</Text>
            </HStack>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
