import { List } from "./List";
import { ArchetypeBase } from "./Archetype";

export type Deck = {
  id: string;
  name: string;
  userId: string;
  archetype: ArchetypeBase;
};

export type DeckWithLists = Deck & {
  lists: [] | List[];
};
