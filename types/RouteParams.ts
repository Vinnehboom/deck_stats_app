import { Deck } from "../types"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { CompositeScreenProps } from "@react-navigation/native"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"

export type MainTabParamList = {
  Landing: undefined
  Decks: undefined
}

export type RootStackParamList = {
  Home: undefined
  Login: undefined
  DecklistHome: { deck: Deck }
}

export type DeckListTabParamList = {
  DecklistDetails: { deck: Deck }
  DecklistMatchups: { deck: Deck }
  DecklistList: { deck: Deck }
}

export type DeckListTabParamsType = {
  Params: { deck: Deck }
}

export type RootScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>

export type MainScreenProps<T extends keyof MainTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, T>,
    RootScreenProps<keyof RootStackParamList>
  >
