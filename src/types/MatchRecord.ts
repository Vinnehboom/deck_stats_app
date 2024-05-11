import { ArchetypeBase, UnknownArchetype } from "./Archetype";
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
  deckArchetype: ArchetypeBase | UnknownArchetype;
  opponentArchetype: ArchetypeBase | UnknownArchetype;
};

export type GamesStarted = { [index: number]: boolean };

export type MatchRecord = TimeStamped & {
  id: string;
  deckId: Deck["id"];
  listId: List["id"];
  list?: List | null;
  deckArchetype: ArchetypeBase;
  opponentArchetype: ArchetypeBase | UnknownArchetype;
  coinFlipWon?: boolean;
  games: Game[];
  bo3: boolean;
  gamesStarted: GamesStarted;
  result: Result;
  remarks: string;
};

export type MatchRecordDataResults = { wins: number; losses: number; ties: number; wr: number | null };

export type Bo1MatchRecordDataEntry = {
  total?: number;
  first: MatchRecordDataResults;
  second: MatchRecordDataResults;
  archetype: ArchetypeBase;
  matchRecords: MatchRecord[];
};

export type Bo3MatchRecordDataEntry = {
  total?: number;
  coinFlipWon: MatchRecordDataResults;
  coinFlipLost: MatchRecordDataResults;
  archetype: ArchetypeBase;
  matchRecords: MatchRecord[];
};

export type MatchRecordDataEntry = Bo1MatchRecordDataEntry & Bo3MatchRecordDataEntry;

export type MatchRecordDataCollection = Record<string, MatchRecordDataEntry>;
export type Bo1MatchRecordDataCollection = Record<string, Bo1MatchRecordDataEntry>;
export type Bo3MatchRecordDataCollection = Record<string, Bo3MatchRecordDataEntry>;
