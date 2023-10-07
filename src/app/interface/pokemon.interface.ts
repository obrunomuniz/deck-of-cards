export interface PokemonTCGResponse {
  data: Card[];
  page: number;
  pageSize: number;
  count: number;
  totalCount: number;
}

export interface Card {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  level?: string;
  hp?: string;
  types?: string[];
  evolvesFrom?: string;
  abilities?: Ability[];
  attacks?: Attack[];
  weaknesses?: Weakness[];
  //TODO: add outros campos
}

export interface Ability {
  name: string;
  text: string;
  type: string;
}

export interface Attack {
  name: string;
  cost: string[];
  convertedEnergyCost: number;
  damage: string;
  text: string;
}

export interface Weakness {
  type: string;
  value: string;
}
