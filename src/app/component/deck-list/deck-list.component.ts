import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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

  selectedDeck: Card | undefined;
  isEditing = false;
  @ViewChild('deckDialog', { static: false }) deckDialog!: IgxDialogComponent;
  newCardName = '';
  @Input() isOpen = false;
  @Output() closeModalEvent = new EventEmitter<boolean>();

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
        this.decks.unshift(...decks);
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
    this.deckDialog.open();
  }

  editDeck(id: string): void { 
    this.selectedDeck = this.decks.find(deck => deck.id === id);
    this.isEditing = true;
    this.newCardName = this.selectedDeck?.name || '';
    this.deckDialog.open();
  }

  onCancel(): void {
    this.deckDialog.close();
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

  onSubmit() {
    if (this.newCardName) {
      if (this.isEditing && this.selectedDeck) {
        // Editar um baralho existente
        this.selectedDeck.name = this.newCardName;
  
        // Encontrar e atualizar o baralho na lista local
        const index = this.decks.findIndex(deck => deck.id === this.selectedDeck!.id);
        if (index !== -1) {
          this.decks[index] = this.selectedDeck;
        }
      } else {
        // Criar um novo baralho com o nome fornecido
        const newDeck: Card = {
          id: Math.random().toString(36).substring(7),
          name: this.newCardName,
        };
  
        // Adicione o novo baralho à lista de baralhos em memória
        this.pokemonService.addDeck(newDeck);
  
        // Adicione o novo baralho diretamente à lista local
        this.decks.unshift(newDeck);
      }
  
      // Atualize a exibição dos baralhos
      this.updateDisplayedDecks();
  
      // Feche o modal
      this.closeModal();
    }
  }
  
  

  closeModal() {
    this.isOpen = false;
    this.deckDialog.close();
    this.newCardName = ''; // Limpar o campo do nome do card ao fechar o modal
  }

}
