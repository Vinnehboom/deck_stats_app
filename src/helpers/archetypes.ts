import { Archetype, ArchetypeBase } from "../types";
import { capitalizeFirstLetter } from "./helpers";

export const transformArchetypes = (archetypes: Archetype[], generations: number[], query: string) => {
  let filteredTypes: Archetype[] = archetypes
    .filter(archetype => generations.includes(archetype.generation))
    .sort((a, b) => (a.generation > b.generation ? -1 : 1));
  if (query.length > 0) {
    const flattenedTypes: ArchetypeBase[] = filteredTypes.reduce((acc: ArchetypeBase[], archetype: Archetype) => {
      const variants = archetype.variants;
      variants.forEach(variant => (variant.icons = [...archetype.icons, variant.icon]));
      return [...acc, archetype, ...variants];
    }, []);
    filteredTypes = flattenedTypes.filter(
      archetype =>
        archetype.identifier.split("-").join(" ").toLowerCase().match(query.toLowerCase()) ||
        archetype.name.toLowerCase().match(query.toLowerCase())
    );
  }

  return filteredTypes;
};

export const transformIdentifier = (identifier: string) => {
  let words = identifier.split("-");
  words = words.map(word => (word !== "ex" ? word[0].toUpperCase() + word.slice(1) : word));
  return words.join(" ");
};

export const glcTypes = [
  "colorless",
  "lightning",
  "fighting",
  "water",
  "grass",
  "fire",
  "metal",
  "psychic",
  "dragon",
  "fairy",
  "dark",
] as const;

export const glcArchetypes = (): Archetype[] => {
  return glcTypes.map(type => {
    return {
      identifier: type,
      name: capitalizeFirstLetter(type),
      icons: [type],
      priority: 10,
      cards: [],
      generation: 10,
      variants: [],
    };
  });
};
