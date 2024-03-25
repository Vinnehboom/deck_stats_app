import { ArchetypeBase } from "../types";
import { Result, allResultOptions as resultOptions } from "../types/MatchRecord";

export const isArchetype = (obj: unknown): obj is ArchetypeBase => {
  if (obj) {
    return typeof obj === "object" && ["identifier", "name", "icons", "cards"].every(property => property in obj);
  }
  return false;
};

export const isResult = (resultStr: unknown): resultStr is Result => {
  if (resultStr) {
    return typeof resultStr === "string" && resultOptions.includes(resultStr);
  }
  return false;
};
