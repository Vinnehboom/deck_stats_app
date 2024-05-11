import { ArchetypeBase, Deck } from "../types";
import { GamesStarted, MatchRecord, Result, allResultOptions as resultOptions } from "../types/MatchRecord";

export const isArchetype = (obj: unknown): obj is ArchetypeBase => {
  if (obj) {
    return (
      obj === "other" || (typeof obj === "object" && ["identifier", "name", "icons", "cards"].every(property => property in obj))
    );
  }
  return false;
};

export const isDeck = (obj: unknown): obj is Deck => {
  if (obj) {
    return typeof obj === "object" && ["activeListId", "id", "name", "userId", "archetype"].every(property => property in obj);
  }
  return false;
};

export const isResult = (resultStr: unknown): resultStr is Result => {
  if (resultStr) {
    return typeof resultStr === "string" && resultOptions.includes(resultStr);
  }
  return false;
};

export const isGamesStarted = (obj: unknown): obj is GamesStarted => {
  if (obj) {
    return (
      typeof obj === "object" && typeof Number(Object.keys(obj)[0]) === "number" && typeof Object.values(obj)[0] === "boolean"
    );
  }
  return false;
};

export const isMatchRecord = (obj: unknown): obj is MatchRecord => {
  if (obj) {
    return (
      typeof obj === "object" &&
      ["id", "deckId", "listId", "deckArchetype", "games", "bo3", "gamesStarted", "opponentArchetype", "result", "remarks"].every(
        property => property in obj
      )
    );
  }
  return false;
};
