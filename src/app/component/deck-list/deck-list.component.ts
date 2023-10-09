import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { IgxDialogComponent, IgxPaginatorComponent } from 'igniteui-angular';
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

  //Add/Edit decks
  @ViewChild('deckDialog', { static: false }) dialog!: IgxDialogComponent;
  selectedDeck: Card | undefined;
  isEditing = false;
  
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

  removeDeck(id: string): void {
    this.pokemonService.removeDeck(id);
    this.loadData();
  }

  viewDeckDetails(id: string): void {
    // Navegar para a página de detalhes com o ID do baralho
  }

  addDeck() {
    this.selectedDeck = undefined;
    this.isEditing = false;
    this.dialog.open();
  }

  editDeck(id: string): void {
    /* this.selectedDeck = deck;
    this.isEditing = true;
    this.dialog.open(); */
  } 

  onDeckSaved(deck: Card): void {
    if (this.isEditing) {
      // Handle editing logic here
      console.log('Deck edited:', deck);
    } else {
      // Handle creation logic here
      console.log('New deck created:', deck);
    }
    this.dialog.close();
  }

  onCancel(): void {
    this.dialog.close();
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
  
  onDeckChange(newDeck: Card | undefined) {
    this.selectedDeck = newDeck;
  }
}
