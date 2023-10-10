import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  deckForm: FormGroup;


  constructor(private pokemonService: PokemonService, private cdr: ChangeDetectorRef,
    private fb: FormBuilder) { 
      this.deckForm = this.fb.group({
        cardName: ['', Validators.required]
      });
    }

  ngOnInit(): void {
    this.loadData();
    this.deckForm = this.fb.group({
      cardName: ['', Validators.required],
    });
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
    //this.loadData();
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
  this.deckForm.get('cardName')?.setValue(this.selectedDeck?.name || '');
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
    if (this.deckForm.valid) {
      const newCardName = this.deckForm.value.cardName;
  
      if (this.isEditing && this.selectedDeck) {
        // Editar um baralho existente
        this.selectedDeck.name = newCardName;
  
        // Atualize o baralho usando o serviço
        this.pokemonService.editDeck(this.selectedDeck.id, this.selectedDeck);
      } else {
        // Criar um novo baralho com o nome fornecido
        const newDeck: Card = {
          id: Math.random().toString(36).substring(7),
          name: newCardName,
        };
  
        // Adicione o novo baralho no início da lista
        this.decks.unshift(newDeck);
  
        // Adicione o novo baralho diretamente ao serviço
        this.pokemonService.addDeck(newDeck);
      }
  
      // Atualize a exibição dos baralhos
      this.updateDisplayedDecks();
  
      // Feche o modal e redefina o formulário
      this.closeModal();
      this.deckForm.reset();
    }
  }
  

  closeModal() {
    this.isOpen = false;
    this.deckDialog.close();
    this.newCardName = '';
  }

  updateEditedName(): void {
    if (this.selectedDeck) {
      const newName = this.deckForm.get('cardName')?.value.trim();
      const currentIndex = this.decks.indexOf(this.selectedDeck);
  
      if (newName !== '') {
        // Atualiza apenas a parte editada do nome, mantendo o restante
        this.selectedDeck.name = newName;
        this.decks[currentIndex] = this.selectedDeck;
      } else {
        // Se o novo nome for em branco, redefina-o para o nome anterior
        this.deckForm.get('cardName')?.setValue(this.selectedDeck.name);
      }
    }
  }

}
