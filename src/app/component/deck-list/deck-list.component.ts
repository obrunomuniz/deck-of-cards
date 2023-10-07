import { Component, OnInit, ViewChild } from '@angular/core';
import { IgxPaginatorComponent } from 'igniteui-angular';
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
  perPage = 10;
  @ViewChild('paginator', { static: true }) public paginator!: IgxPaginatorComponent;


  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.loadData();
  }

  // Função para carregar os dados
  loadData() {
    this.loading = true;
    this.pokemonService.getDecks().subscribe({
      next: decks => {
        console.log('Decks recebidos:', decks);
        this.decks = decks;
        this.paginator.perPage = this.perPage;
        this.paginator.totalRecords = decks.length;
        this.paginator.page = 0; // Garante que a página seja definida como 0 ao carregar os dados
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
