import { ArchetypeBase, Deck } from "../types";
import { GamesStarted, Result, allResultOptions as resultOptions } from "../types/MatchRecord";

export const isArchetype = (obj: unknown): obj is ArchetypeBase => {
  if (obj) {
    return typeof obj === "object" && ["identifier", "name", "icons", "cards"].every(property => property in obj);
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
