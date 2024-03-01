import { List } from "./List";
import { ArchetypeBase } from "./Archetype";

export type Deck = {
  activeListId?: string;
  id: string;
  name: string;
  userId: string;
  archetype: ArchetypeBase;
};

export type DeckWithLists = Deck & {
  lists: [] | List[];
};
