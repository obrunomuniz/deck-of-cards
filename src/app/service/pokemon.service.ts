import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environment/environment';
import { Card, PokemonTCGResponse } from '../interface/pokemon.interface';
import { Deck } from '../interface/deck.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private decks: Deck[] = [];
  private cards: Card[] = [];

  constructor(private http: HttpClient) { }

  // Métodos relacionados aos Cards
  getCards(page: number = 1): Observable<PokemonTCGResponse> {
    return this.http.get<PokemonTCGResponse>(`${environment.api.url}cards?page=${page}`);
  }

  getCard(id: string): Observable<Card> {
    const card = this.decks.find(deck => deck.id === id);
    if (card) {
      return of(card);
    } else {
      return this.http.get<any>(`${environment.api.url}cards/${id}`)
        .pipe(
          map(response => response.card)
        );
    }
  }

  loadCards(): Observable<Card[]> {
    return this.getCards().pipe(
      map((response: PokemonTCGResponse) => {
        console.log("Resposta da API:", response);
        const apiDecks: Card[] = response.cards.map((card: Card) => (
          {
            id: card.id, name: card.name,
            imageUrl: card.imageUrl,
            imageUrlHiRes: card.imageUrlHiRes,
            supertype: card.supertype,
            subtype: card.subtype,
            number: card.number,
            artist: card.artist,
            rarity: card.rarity,
            series: card.series,
            set: card.set,
            setCode: card.setCode,
            attacks: card.attacks,
            weaknesses: card.weaknesses,
            resistances: card.resistances
          }
        ));
        console.log("apiDecks", apiDecks)
        return [...apiDecks, ...this.decks];
      })
    );
  }

  removeCard(id: string): void {
    this.cards = this.cards.filter(card => card.id !== id);
  }

  editCard(id: string, updatedCard: Card): void {
    const index = this.cards.findIndex(card => card.id === id);
    if (index !== -1) {
      this.cards[index] = updatedCard;
    }
  }

  addCard(card: Card): void {
    this.cards.push(card);
  }

  // Métodos relacionados aos baralhos em memória
 addDeck(deck: Deck): void {
    this.decks.push(deck);
}

 getDecks(): Observable<Deck[]> {
  return of(this.decks);
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
