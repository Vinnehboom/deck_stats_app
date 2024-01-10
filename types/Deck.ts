import { List } from "./List"

export type Deck = {
  id: string
  name: string
  userId: string
}

export type DeckWithLists = Deck & {
  lists: [] | List[]
}
