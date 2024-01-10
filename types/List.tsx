import { Card } from "./Card"

type CardList = { [count: number]: Card }[]

type List = {
  id: string
  deckId: string
  cards: CardList
}

export type { List, CardList }
