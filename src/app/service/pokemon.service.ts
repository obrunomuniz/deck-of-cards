import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environment/environment';
import { Card, PokemonTCGResponse } from '../interface/pokemon.interface';
import { Deck } from '../interface/deck.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private decks: Deck[] = [];

  constructor(private http: HttpClient) { }

  // Métodos relacionados à API do Pokémon
  getCards(page: number = 1): Observable<PokemonTCGResponse> {
    return this.http.get<PokemonTCGResponse>(`${environment.api.url}cards?page=${page}`);
  }

  getDecks(): Observable<Deck[]> {
    return this.getCards().pipe(
      map((response: PokemonTCGResponse) => {
        console.log("Resposta da API:", response);
        const apiDecks: Deck[] = response.cards.map((card: Card) => ({ id: card.id, name: card.name, cards: [] }));
        return [...apiDecks, ...this.decks];
      })
    );
  }


  // Métodos relacionados aos baralhos em memória
  addDeck(deck: Deck): void {
    this.decks.push(deck);
  }

  getDeck(id: string): Deck | undefined {
    return this.decks.find(deck => deck.id === id);
  }

  editDeck(id: string, updatedDeck: Deck): void {
    const index = this.decks.findIndex(deck => deck.id === id);
    if (index !== -1) {
      this.decks[index] = updatedDeck;
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
