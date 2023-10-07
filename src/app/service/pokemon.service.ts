import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { PokemonTCGResponse } from '../interface/pokemon.interface';
import { Deck } from '../interface/deck.interface';
@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }
  private decks: Deck[] = [];
  
  // Métodos relacionados à API do Pokémon
  getCards(page: number = 1): Observable<PokemonTCGResponse> {
    return this.http.get<PokemonTCGResponse>(`${environment.api}cards?page=${page}`);
  }

  // Métodos relacionados aos baralhos em memória
  getDecks(): Deck[] {
    return this.decks;
  }

  getDeck(id: string): Deck | undefined {
    return this.decks.find(deck => deck.id === id);
  }

  addDeck(deck: Deck): void {
    this.decks.push(deck);
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

  //Métodos para o thema
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
