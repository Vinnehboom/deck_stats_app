import { ArchetypeBase } from "./Archetype";
import { Deck } from "./Deck";
import { TimeStamped } from "./TimeStamped";
import { List } from "./List";
export const bo1ResultOptions = ["W", "L", "T"];
export const allResultOptions = [...bo1ResultOptions, "WL", "LW", "WW", "LL", "WLL", "LWW", "LWL", "WLW"];

// TODO: look into cleaner options

export type Bo1Result = "W" | "L" | "T" | string;
export type Bo3Result = "WL" | "LW" | "WW" | "WLL" | "WLW" | "LL" | "LWW" | "LWL" | string;
export type Result = Bo1Result | Bo3Result;

export type Game = {
  id: string;
  matchRecordId: MatchRecord["id"];
  started?: boolean;
  result: Result;
  list?: List;
  deckArchetype: ArchetypeBase;
  opponentArchetype: ArchetypeBase;
};

export type GamesStarted = { [index: number]: boolean };

export type MatchRecord = TimeStamped & {
  id: string;
  deckId: Deck["id"];
  listId: List["id"];
  list?: List | null;
  deckArchetype: ArchetypeBase;
  opponentArchetype: ArchetypeBase;
  coinFlipWon?: boolean;
  games: Game[];
  bo3: boolean;
  gamesStarted: GamesStarted;
  result: Result;
  remarks: string;
};

export type MatchRecordDataResults = { wins: number; losses: number; ties: number; wr: number | null };

export type MatchRecordDataEntry = {
  total?: number;
  first: MatchRecordDataResults;
  second: MatchRecordDataResults;
  archetype: ArchetypeBase;
  matchRecords: MatchRecord[];
};

export type MatchRecordDataCollection = Record<string, MatchRecordDataEntry>;
