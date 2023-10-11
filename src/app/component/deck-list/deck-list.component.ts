import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IgxDialogComponent, IgxPaginatorComponent } from 'igniteui-angular';
import { Deck } from 'src/app/interface/pokemon.interface';
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
  decks: Deck[] = [];
  displayedDecks: Deck[] = [];

  selectedDeck: Deck | undefined;
  isEditing = false;
  @ViewChild('deckDialog', { static: false }) deckDialog!: IgxDialogComponent;
  newDeckdName = '';
  @Input() isOpen = false;
  @Output() closeModalEvent = new EventEmitter<boolean>();

  deckForm: FormGroup;

  constructor(private pokemonService: PokemonService, private cdr: ChangeDetectorRef,
    private fb: FormBuilder, private router: Router) {
    this.deckForm = this.fb.group({
      deckName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadData();
    this.deckForm = this.fb.group({
      deckName: ['', Validators.required],
    });
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  // Função para carregar os dados
  loadData() {
    this.loading = true;
    this.pokemonService.loadDecks().subscribe({
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
    this.decks = this.decks.filter(deck => deck.id !== id);
    this.updateDisplayedDecks();
  }

  viewDeckDetails(id: string): void { 
    this.router.navigate(['/deck-detail', id]);
  }

  addDeck() {
    this.selectedDeck = undefined;
    this.isEditing = false;
    this.deckDialog.open();
  }

  editDeck(id: string): void {
    this.selectedDeck = this.decks.find(deck => deck.id === id);
    this.isEditing = true;
    this.deckForm.get('deckName')?.setValue(this.selectedDeck?.name || '');
    this.deckDialog.open();
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
      const newDeckdName = this.deckForm.value.deckName;

      if (this.isEditing && this.selectedDeck) {
        // Editar um baralho existente
        this.selectedDeck.name = newDeckdName;

        // Atualizar o baralho usando o serviço
        this.pokemonService.editDeck(this.selectedDeck.id, this.selectedDeck);
      } else {
        // Criar um novo baralho com o nome fornecido
        const newDeck: Deck = {
          id: Math.random().toString(36).substring(7),
          name: newDeckdName,
        };

        // Adicionar o novo baralho no início da lista
        this.decks.unshift(newDeck);

        // Adicione o novo baralho diretamente ao serviço
        this.pokemonService.addDeck(newDeck);
      }

      // Atualizar a exibição dos baralhos
      this.updateDisplayedDecks();
      this.closeModal();
      this.deckForm.reset();
    }
  }


  closeModal() {
    this.isOpen = false;
    this.deckDialog.close();
    this.newDeckdName = '';
  }

  updateEditedName(): void {
    if (this.selectedDeck) {
      const newName = this.deckForm.get('deckName')?.value.trim();
      const currentIndex = this.decks.indexOf(this.selectedDeck);

      if (newName !== '') {
        // Atualiza apenas a parte editada do nome, mantendo o restante
        this.selectedDeck.name = newName;
        this.decks[currentIndex] = this.selectedDeck;
      } else {
        // Se o novo nome for em branco, redefina-o para o nome anterior
        this.deckForm.get('deckName')?.setValue(this.selectedDeck.name);
      }
    }
  }
}
