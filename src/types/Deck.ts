import { List } from "./List";
import { ArchetypeBase, UnknownArchetype } from "./Archetype";

export type Deck = {
  activeListId?: string;
  id: string;
  name: string;
  userId: string;
  archetype: ArchetypeBase | UnknownArchetype;
};

export type DeckWithLists = Deck & {
  lists: [] | List[];
};
