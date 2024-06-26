import { ArchetypeBase, Deck, MatchRecord } from "../types";

export type MainTabParamList = {
  Landing: undefined;
  Decks: undefined;
};

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  DecklistHome: { deckId: Deck["id"]; screen?: keyof DeckListTabParamList };
  MatchupNotes: { deck: Deck; archetype: ArchetypeBase };
  MatchExport: { matchupRecords: MatchRecord[] };
  Account: undefined;
};

export type DeckListTabParamList = {
  DeckDetails: { deck: Deck };
  DeckMatchups: { deck: Deck };
  DeckLists: { deck: Deck };
};

export type DeckListTabParamsType = {
  Params: { deckId: Deck["id"] };
};
