import { Archetype, ArchetypeBase } from "../types";

export const transformArchetypes = (archetypes: Archetype[], generations: number[], query: string) => {
  let filteredTypes = archetypes
    .filter(archetype => generations.includes(archetype.generation))
    .filter(archetype => archetype.priority > 5);
  if (query.length > 0) {
    filteredTypes = filteredTypes.filter(
      archetype => archetype.identifier.match(query.toLowerCase()) || archetype.name.toLowerCase().includes(query.toLowerCase())
    );
  }
  const flattenedTypes: ArchetypeBase[] = filteredTypes.reduce((acc: ArchetypeBase[], archetype: Archetype) => {
    const variants = archetype.variants;
    variants.forEach(variant => (variant.icons = [...archetype.icons, variant.icon]));
    return [...acc, archetype, ...variants];
  }, []);
  return flattenedTypes.sort((a, b) => (a.priority < b.priority ? 1 : -1));
};
