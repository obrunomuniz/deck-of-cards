import { Card } from "./pokemon.interface";

export interface Deck {
    id: string;
    name: string;
    cards: Card[];
  }