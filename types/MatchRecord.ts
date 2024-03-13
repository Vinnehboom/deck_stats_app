import { ArchetypeBase } from "./Archetype";
import { Deck } from "./Deck";
import { List } from "./List";
export const bo1ResultOptions = ["W", "L", "T"];
export const allResultOptions = [...bo1ResultOptions, "WLT", "LWT", "WW", "LL", "WWL", "WLL", "LWW", "LWL", "WLW"];

// TODO: look into cleaner options

export type Result = "W" | "L" | "T" | "WLT" | "LWT" | "WW" | "LL" | "WWL" | "WLL" | "LWW" | "LWL" | "WLW" | string;

export type MatchRecord = {
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
