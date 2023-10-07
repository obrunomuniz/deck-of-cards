export interface PokemonTCGResponse {
  cards: Card[];
  page?: number;
  pageSize?: number;
  count?: number;
  totalCount?: number;
}

export interface Card {
  id: string;
  name: string;
  nationalPokedexNumber?: number;
  imageUrl: string;
  imageUrlHiRes: string;
  types?: string[];
  supertype: string;
  subtype: string;
  evolvesFrom?: string;
  hp?: string;
  retreatCost?: string[];
  convertedRetreatCost?: number;
  number: string;
  artist: string;
  rarity: string;
  series: string;
  set: string;
  setCode: string;
  attacks?: Attack[];
  weaknesses?: Weakness[];
  resistances?: Resistance[];
  // TODO: adicione outros campos conforme necessário
}

export interface Attack {
  cost: string[];
  name: string;
  text: string;
  damage: string;
  convertedEnergyCost: number;
}

export interface Weakness {
  type: string;
  value: string;
}

export interface Resistance {
  type: string;
  value: string;
}
