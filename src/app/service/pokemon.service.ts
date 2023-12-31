import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environment/environment';
import { Deck, PokemonTCGResponse } from '../interface/pokemon.interface';
import { Card } from '../interface/card.inteface';
@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private decks: Deck[] = [];
  private editedDeck: Deck | null = null;


  constructor(private http: HttpClient) { }

  // Métodos relacionados aos baralhos
  getDecks(page: number = 1): Observable<PokemonTCGResponse> {
    return this.http.get<PokemonTCGResponse>(`${environment.api.url}cards?page=${page}`);
  }

  getDeck(id: string): Observable<Deck> {
    const deck = this.decks.find(deck => deck.id === id);
    if (deck) {
      return of(deck);
    } else {
      return this.http.get<any>(`${environment.api.url}cards/${id}`)
        .pipe(
          map(response => response.card)
        );
    }
  }

  loadDecks(): Observable<Deck[]> {
    return this.getDecks().pipe(
      map((response: PokemonTCGResponse) => {
        const apiDecks: Deck[] = response.cards.map((deck: Deck) => {
          return {
            ...deck,
            cards: deck.cards || []
          };
        });
        return [...apiDecks, ...this.decks];
      })
    );
  }

  addCardToDeck(deckId: string, card: Card): boolean {
    const deck = this.decks.find(d => d.id === deckId);

    if (!deck) return false;

    deck.cards = deck.cards || [];

    const existingCard = deck.cards.find(c => c.name === card.name);

    if (existingCard) {
      existingCard.count = (existingCard.count || 0) + 1;
      if (existingCard.count > 4) return false;
    } else {
      card.count = 1;
      deck.cards.push(card);
    }

    return true;
  }

  removeCardFromDeck(deckId: string, cardId: string): void {
    const deck = this.decks.find(d => d.id === deckId);
    if (deck && deck.cards) {
      const card = deck.cards.find((c, index) => c.id === cardId);
      if (card) {
        card.count = card.count || 0;
        if (card.count > 1) {
          card.count -= 1;
        } else {
          const cardIndex = deck.cards.indexOf(card);
          deck.cards.splice(cardIndex, 1);
        }
      }
    }
  }

  getRandomCards(count: number = 24): Observable<Card[]> {
    return this.getDecks(1) // supondo que a primeira página tenha uma grande variedade de cartas
      .pipe(
        map(response => {
          const randomCards: Card[] = [];
          for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * response.cards.length);
            randomCards.push(response.cards[randomIndex]);
          }
          return randomCards;
        })
      );
  }

  setCurrentEditedDeck(deck: Deck): void {
    this.editedDeck = deck;
  }
  
  getCurrentEditedDeck(): Deck | null {
    return this.editedDeck;
  }

  addDeck(deck: Deck): void {
    deck.cards = deck.cards || [];
    this.decks.push(deck);
  }

  editDeck(id: string, updatedDeck: Deck): void {
    const index = this.decks.findIndex(deck => deck.id === id);
    if (index !== -1) {
      this.decks[index] = updatedDeck;
      this.setCurrentEditedDeck(updatedDeck); // adicionado esta linha
    }
  }

  removeDeck(id: string): void {
    this.decks = this.decks.filter(deck => deck.id !== id);
  }

  // Métodos para o tema
  getTheme(): string | null {
    return localStorage.getItem('theme');
  }

  setTheme(theme: string): void {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      this.activateDarkTheme();
    } else {
      this.activateLightTheme();
    }
  }

  private activateDarkTheme(): void {
    document.body.classList.add('dark');
  }

  private activateLightTheme(): void {
    document.body.classList.remove('dark');
  }
}
