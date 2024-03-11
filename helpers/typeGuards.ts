import { Archetype } from "../types";
import { Result, resultOptions } from "../types/MatchRecord";

export const isArchetype = (obj: unknown): obj is Archetype => {
  if (obj) {
    return (
      typeof obj === "object" &&
      ["identifier", "name", "icons", "cards", "variants", "generation"].every(property => property in obj)
    );
  }
  return false;
};

export const isResult = (resultStr: unknown): resultStr is Result => {
  if (resultStr) {
    return typeof resultStr === "string" && resultOptions.includes(resultStr);
  }
  return false;
};
