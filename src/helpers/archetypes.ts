import { Archetype, ArchetypeBase } from "../types";

export const transformArchetypes = (archetypes: Archetype[], generations: number[], query: string) => {
  let filteredTypes: Archetype[] = archetypes
    .filter(archetype => generations.includes(archetype.generation))
    .sort((a, b) => (a.generation > b.generation ? 1 : -1));
  if (query.length > 0) {
    const flattenedTypes: ArchetypeBase[] = filteredTypes
      .sort((a, b) => (a.generation === b.generation && a.priority < b.priority ? 1 : -1))
      .reduce((acc: ArchetypeBase[], archetype: Archetype) => {
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
