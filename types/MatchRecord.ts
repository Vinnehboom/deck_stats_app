import { ArchetypeBase } from "./Archetype";
import { Deck } from "./Deck";
import { TimeStamped } from "./TimeStamped";
import { List } from "./List";
export const bo1ResultOptions = ["W", "L", "T"];
export const allResultOptions = [...bo1ResultOptions, "WLT", "LWT", "WW", "LL", "WWL", "WLL", "LWW", "LWL", "WLW"];

// TODO: look into cleaner options

export type Result = "W" | "L" | "T" | "WLT" | "LWT" | "WW" | "LL" | "WWL" | "WLL" | "LWW" | "LWL" | "WLW" | string;

export type MatchRecord = TimeStamped & {
  id: string;
  deckId: Deck["id"];
  listId: List["id"];
  deckArchetype: ArchetypeBase;
  opponentArchetype: ArchetypeBase;
  coinFlipWon?: boolean;
  started?: boolean;
  result: Result;
  remarks: string;
};

export type MatchRecordDataResults = { wins: number; losses: number; ties: number; wr: number };

export type MatchRecordDataEntry = {
  total?: number;
  first: MatchRecordDataResults;
  second: MatchRecordDataResults;
  archetype: ArchetypeBase;
  matchRecords: MatchRecord[];
};

export type MatchRecordData = {
  [a: string]: MatchRecordDataEntry;
};
