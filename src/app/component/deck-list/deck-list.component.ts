import { Component, OnInit } from '@angular/core';
import { Deck } from 'src/app/interface/deck.interface';
import { PokemonService } from 'src/app/service/pokemon.service';
@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.scss']
})
export class DeckListComponent implements OnInit {
  decks: Deck[] = [];
  loading = false;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.loadData(); // Iniciar o carregamento de dados ao inicializar o componente
  }

  // Função para carregar os dados
  loadData() {
    this.loading = true;
    this.pokemonService.getDecks().subscribe({
      next: decks => {
        console.log('Decks recebidos:', decks);
        this.decks = decks;
      },
      error: error => console.error('Erro ao obter baralhos:', error),
      complete: () => {
        this.loading = false;
      }
    });
  }

  editDeck(id: string): void {
    // Navegar para a página de edição com o ID do baralho
  }

  removeDeck(id: string): void {
    this.pokemonService.removeDeck(id);
    // Recarregar a lista após a remoção
    this.loadData();
  }

  viewDeckDetails(id: string): void {
    // Navegar para a página de detalhes com o ID do baralho
  }

  addDeck() {
    // Lógica para adicionar um novo baralho
  }
}
