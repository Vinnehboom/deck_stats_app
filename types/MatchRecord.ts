import { ArchetypeBase } from "./Archetype";
import { Deck } from "./Deck";
import { List } from "./List";
export const resultOptions = ["W", "L", "T", "WLT", "LWT", "WW", "LL", "WWL", "WLL", "LWW", "LWL", "WLW"];

// TODO: look into cleaner options

export type Result = "W" | "L" | "T" | "WLT" | "LWT" | "WW" | "LL" | "WWL" | "WLL" | "LWW" | "LWL" | "WLW" | string;

export type MatchRecord = {
  id: string;
  deckId: Deck["id"];
  listId: List["id"];
  opponentArchetype: ArchetypeBase;
  coinFlipWon: boolean;
  result: Result;
  remarks: string;
};
