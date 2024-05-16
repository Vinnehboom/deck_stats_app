import { v4 as uuidv4 } from "uuid";

import {
  Bo1MatchRecordDataCollection,
  Bo1MatchRecordDataEntry,
  Bo1Result,
  Bo3MatchRecordDataCollection,
  Game,
  MatchRecord,
  MatchRecordDataCollection,
} from "../types/MatchRecord";

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

export const transformMatchRecordData = (records: MatchRecord[], bo3 = false): MatchRecordDataCollection => {
  return bo3 ? calculateBo3Data(records) : calculateBo1Data(records.flatMap(record => record.games));
};

const calculateBo3Data = (matchRecords: MatchRecord[]): Bo3MatchRecordDataCollection => {
  const bo3Records = matchRecords.filter(record => record.bo3);
  const calculatedData: Bo3MatchRecordDataCollection = bo3Records?.reduce<Bo3MatchRecordDataCollection>(
    (gameData, matchRecord: MatchRecord) => {
      const archetype = matchRecord.opponentArchetype;
      const archetypeData = gameData[archetype.identifier] || {
        coinFlipWon: { wins: 0, losses: 0, ties: 0, wr: 0, total: 0 },
        coinFlipLost: { wins: 0, losses: 0, ties: 0, wr: 0, total: 0 },
        archetype: archetype,
        matchRecords: [],
      };
      const coinFlipWon = matchRecord.coinFlipWon;
      coinFlipWon ? archetypeData.coinFlipWon.total++ : archetypeData.coinFlipLost.total++;
      if (matchWon(matchRecord)) {
        coinFlipWon
          ? (archetypeData.coinFlipWon.wins = archetypeData.coinFlipWon.wins + 1)
          : (archetypeData.coinFlipLost.wins = archetypeData.coinFlipLost.wins + 1);
      } else if (matchLost(matchRecord)) {
        coinFlipWon
          ? (archetypeData.coinFlipWon.losses = archetypeData.coinFlipWon.losses + 1)
          : (archetypeData.coinFlipLost.losses = archetypeData.coinFlipLost.losses + 1);
      } else {
        coinFlipWon
          ? (archetypeData.coinFlipWon.ties = archetypeData.coinFlipWon.ties + 1)
          : (archetypeData.coinFlipLost.ties = archetypeData.coinFlipLost.ties + 1);
      }
      return {
        ...gameData,
        [archetype.identifier]: {
          ...archetypeData,
          matchRecords: [...archetypeData.matchRecords, matchRecord],
        },
      };
    },
    {}
  );
  Object.keys(calculatedData).forEach(arketype => {
    calculatedData[arketype].coinFlipWon.wr = calculateWinRate(calculatedData[arketype].coinFlipWon);
    calculatedData[arketype].coinFlipLost.wr = calculateWinRate(calculatedData[arketype].coinFlipLost);
  });
  return calculatedData;
};

const calculateBo1Data = (games: Game[]) => {
  const calculatedData: Bo1MatchRecordDataCollection = games?.reduce<MatchRecordData>((gameData, game: Game) => {
    const archetype = game.opponentArchetype;
    const archetypeData = gameData[archetype.identifier] || {
      first: { wins: 0, losses: 0, ties: 0, wr: 0, total: 0 },
      second: { wins: 0, losses: 0, ties: 0, wr: 0, total: 0 },
      archetype: archetype,
      matchRecords: [],
    };
    const started = game.started;
    started ? archetypeData.first.total++ : archetypeData.second.total++;
    if (matchWon(game)) {
      started ? archetypeData.first.wins++ : archetypeData.second.wins++;
    } else if (matchLost(game)) {
      started
        ? (archetypeData.first.losses = archetypeData.first.losses + 1)
        : (archetypeData.second.losses = archetypeData.second.losses + 1);
    } else {
      started
        ? (archetypeData.first.ties = archetypeData.first.ties + 1)
        : (archetypeData.second.ties = archetypeData.second.ties + 1);
    }
    return {
      ...gameData,
      [archetype.identifier]: {
        ...(archetypeData as Bo1MatchRecordDataEntry),
        matchRecords: [...archetypeData.matchRecords, game],
      },
    };
  }, {});
  Object.keys(calculatedData).forEach(arketype => {
    calculatedData[arketype].first.wr = calculateWinRate(calculatedData[arketype].first);
    calculatedData[arketype].second.wr = calculateWinRate(calculatedData[arketype].second);
  });
  return calculatedData;
};
