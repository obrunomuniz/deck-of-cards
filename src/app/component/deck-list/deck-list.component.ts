import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { IgxPaginatorComponent } from 'igniteui-angular';
import { Card } from 'src/app/interface/pokemon.interface';
import { PokemonService } from 'src/app/service/pokemon.service';
@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.scss']
})
export class DeckListComponent implements OnInit {
  @ViewChild('paginator', { static: true }) public paginator!: IgxPaginatorComponent;
  loading = false;
  event: any;

  itemsPerPage = 12;
  currentPage = 0;
  decks: Card[] = [];
  displayedDecks: Card[] = [];

  constructor(private pokemonService: PokemonService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  // Função para carregar os dados
  loadData() {
    this.loading = true;
    this.pokemonService.getDecks().subscribe({
      next: decks => {
        this.decks = decks;
        this.loading = false;
        this.updateDisplayedDecks();
        this.loading = false;
      },
      error: error => {
        console.error('Erro ao obter baralhos:', error);
        this.loading = false;
      }
    });
  }

  editDeck(id: string): void {
    // Navegar para a página de edição com o ID do baralho
  }

  removeDeck(id: string): void {
    this.pokemonService.removeDeck(id);
    this.loadData();
  }

  viewDeckDetails(id: string): void {
    // Navegar para a página de detalhes com o ID do baralho
  }

  addDeck() {
    // Lógica para adicionar um novo baralho
  }
  
  updateDisplayedDecks() {
    if (this.paginator && this.paginator.page !== undefined) {
      const startIndex = this.paginator.page * this.itemsPerPage;
      const endIndex = Math.min(startIndex + this.itemsPerPage, this.decks.length);
      this.displayedDecks = this.decks.slice(startIndex, endIndex);
    }
  }

  onItemsPerPageChange(event: number) {
    this.itemsPerPage = event;
    if (this.paginator) {
      this.paginator.perPage = this.itemsPerPage;
      this.paginator.page = 0;
      this.updateDisplayedDecks();
    }
  }
}
