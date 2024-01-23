import { Deck } from "../types";

export type MainTabParamList = {
  Landing: undefined;
  Decks: undefined;
};

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  DecklistHome: { deck: Deck };
};

export type DeckListTabParamList = {
  DecklistDetails: { deck: Deck };
  DecklistMatchups: { deck: Deck };
  DecklistList: { deck: Deck };
};

export type DeckListTabParamsType = {
  Params: { deck: Deck };
};
