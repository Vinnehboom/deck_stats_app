export type ArchetypeBase = {
  identifier: string;
  name: string;
  icons: string[];
  priority: number;
  cards: {
    name: string;
    count: string;
  }[];
};

export type UnknownArchetype = "other";

export type Archetype = ArchetypeBase & {
  variants: (ArchetypeBase & { icon: string })[];
  generation: number;
};
