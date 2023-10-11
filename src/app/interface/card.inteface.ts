export interface Card {
    id: string;
    name: string;
    imageUrl?: string;
    supertype?: string;
    subtype?: string;
    types?: string[];
    count?: number;
}
