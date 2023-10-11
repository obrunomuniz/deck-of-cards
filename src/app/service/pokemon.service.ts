import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environment/environment';
import { Deck, PokemonTCGResponse } from '../interface/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private decks: Deck[] = [];

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
        console.log("Resposta da API:", response);
        const apiDecks: Deck[] = response.cards.map((deck: Deck) => (
          {
            id: deck.id, name: deck.name,
            imageUrl: deck.imageUrl,
            imageUrlHiRes: deck.imageUrlHiRes,
            supertype: deck.supertype,
            subtype: deck.subtype,
            number: deck.number,
            artist: deck.artist,
            rarity: deck.rarity,
            series: deck.series,
            set: deck.set,
            setCode: deck.setCode,
            attacks: deck.attacks,
            weaknesses: deck.weaknesses,
            resistances: deck.resistances
          }
        ));
        console.log("apiDecks", apiDecks)
        return [...apiDecks, ...this.decks];
      })
    );
  }

  // Métodos relacionados aos baralhos em memória
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
