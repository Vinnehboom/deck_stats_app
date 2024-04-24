import { v4 as uuidv4 } from "uuid";

import { Bo1Result, Game, MatchRecord, MatchRecordDataCollection } from "../types/MatchRecord";

import "react-native-get-random-values";

export const matchWon = (record: MatchRecord | Game): boolean => {
  return ["W", "WW", "WLW", "LWW"].includes(record.result) ? true : false;
};

export const matchLost = (record: MatchRecord | Game): boolean => {
  return ["L", "LL", "WLL", "LWL"].includes(record.result) ? true : false;
};

export const setGames = (record: MatchRecord): MatchRecord => {
  record.result.split("").forEach((resultString: Bo1Result, index) => {
    const game: Game = {
      id: uuidv4(),
      matchRecordId: record.id,
      started: record.gamesStarted[index],
      list: record.list || null,
      deckArchetype: record.deckArchetype,
      result: resultString,
      opponentArchetype: record.opponentArchetype,
    };
    record.list ? (game.list = record.list) : null;
    record.games.push(game);
  });
  return record;
};

export const calculateWinRate = (winRateData: { wins: number; losses: number; ties: number }) => {
  const result = winRateData.wins / (winRateData.wins + winRateData.losses + winRateData.ties);
  return isNaN(result) || result === Infinity ? null : result * 100;
};

export const transformMatchRecordData = (records: MatchRecord[]): MatchRecordDataCollection => {
  const games = records.flatMap(record => record.games);
  const calculatedData: MatchRecordDataCollection = games?.reduce<MatchRecordData>((gameData, game: Game) => {
    const archetype = game.opponentArchetype;
    const archetypeData = gameData[archetype.identifier] || {
      first: { wins: 0, losses: 0, ties: 0, wr: 0 },
      second: { wins: 0, losses: 0, ties: 0, wr: 0 },
      archetype: archetype,
      matchRecords: [],
    };
    const started = game.started;
    if (matchWon(game)) {
      started
        ? (archetypeData.first.wins = archetypeData.first.wins + 1)
        : (archetypeData.second.wins = archetypeData.second.wins + 1);
    } else if (matchLost(game)) {
      started
        ? (archetypeData.first.losses = archetypeData.first.losses + 1)
        : (archetypeData.second.losses = archetypeData.second.losses + 1);
    } else {
      started
        ? (archetypeData.first.ties = archetypeData.first.ties + 1)
        : (archetypeData.second.ties = archetypeData.second.ties + 1);
    }
    return { ...gameData, [archetype.identifier]: { ...archetypeData, matchRecords: [...archetypeData.matchRecords, game] } };
  }, {});
  Object.keys(calculatedData).forEach(arketype => {
    calculatedData[arketype].first.wr = calculateWinRate(calculatedData[arketype].first);
    calculatedData[arketype].second.wr = calculateWinRate(calculatedData[arketype].second);
  });
  return calculatedData;
};
