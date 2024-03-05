import { Deck } from "../types";

export type MainTabParamList = {
  Landing: undefined;
  Decks: undefined;
};

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  DecklistHome: { deckId: Deck["id"] };
};

export type DeckListTabParamList = {
  DeckDetails: { deck: Deck };
  DeckMatchups: { deck: Deck };
  DeckLists: { deck: Deck };
};

export type DeckListTabParamsType = {
  Params: { deckId: Deck["id"] };
};
