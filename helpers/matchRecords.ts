import { MatchRecord, MatchRecordData } from "../types/MatchRecord";

export const matchWon = (record: MatchRecord): boolean => {
  return record.result === "W" ? true : false;
};

export const matchLost = (record: MatchRecord): boolean => {
  return record.result === "L" ? true : false;
};

export const calculateWinRate = (winRateData: { wins: number; losses: number }) => {
  const result = winRateData.wins / (winRateData.wins + winRateData.losses);
  return isNaN(result) || result === Infinity ? 0 : result * 100;
};

export const transformMatchRecordData = (records: MatchRecord[]) => {
  const calculatedData = records?.reduce<MatchRecordData>((recordData, record: MatchRecord) => {
    const archetype = record.opponentArchetype;
    const archetypeData = recordData[archetype.identifier] || {
      first: { wins: 0, losses: 0, ties: 0, wr: 0 },
      second: { wins: 0, losses: 0, ties: 0, wr: 0 },
      archetype: archetype,
      matchRecords: [],
    };
    const started = record.started;
    if (matchWon(record)) {
      started
        ? (archetypeData.first.wins = archetypeData.first.wins + 1)
        : (archetypeData.second.wins = archetypeData.second.wins + 1);
    } else if (matchLost(record)) {
      started
        ? (archetypeData.first.losses = archetypeData.first.losses + 1)
        : (archetypeData.second.losses = archetypeData.second.losses + 1);
    } else {
      started
        ? (archetypeData.first.ties = archetypeData.first.ties + 1)
        : (archetypeData.second.ties = archetypeData.second.ties + 1);
    }
    return { ...recordData, [archetype.identifier]: { ...archetypeData, matchRecords: [...archetypeData.matchRecords, record] } };
  }, {});
  Object.keys(calculatedData).forEach(arketype => {
    calculatedData[arketype].first.wr = calculateWinRate(calculatedData[arketype].first);
    calculatedData[arketype].second.wr = calculateWinRate(calculatedData[arketype].second);
  });
  return calculatedData;
};
