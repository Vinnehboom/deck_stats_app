import { Card } from "./Card";

export type CardListItem = {
  count: number;
  card: Card;
};

export type CardList = CardListItem[];

export type List = {
  name: string;
  id: string;
  deckId: string;
  cards: CardList;
};

export type ActiveList = {
  list: List;
};
