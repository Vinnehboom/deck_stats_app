import { Archetype, ArchetypeBase } from "../types";

export const transformArchetypes = (archetypes: Archetype[], generations: number[], query: string) => {
  let filteredTypes = archetypes.filter(archetype => generations.includes(archetype.generation));
  if (query.length > 0) {
    filteredTypes = filteredTypes
      .filter(
        archetype => archetype.identifier.match(query.toLowerCase()) || archetype.name.toLowerCase().includes(query.toLowerCase())
      )
      .sort((a, b) => (a.generation > b.generation ? 1 : -1));
  }
  const flattenedTypes: ArchetypeBase[] = filteredTypes
    .sort((a, b) => (a.generation === b.generation && a.priority < b.priority ? 1 : -1))
    .reduce((acc: ArchetypeBase[], archetype: Archetype) => {
      const variants = archetype.variants;
      variants.forEach(variant => (variant.icons = [...archetype.icons, variant.icon]));
      return [...acc, archetype, ...variants];
    }, []);
  return flattenedTypes;
};

export const transformIdentifier = (identifier: string) => {
  let words = identifier.split("-");
  words = words.map(word => (word !== "ex" ? word[0].toUpperCase() + word.slice(1) : word));
  return words.join(" ");
};
