import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IgxDialogComponent, IgxPaginatorComponent } from 'igniteui-angular';
import { Card } from 'src/app/interface/pokemon.interface';
import { PokemonService } from 'src/app/service/pokemon.service';
@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  @ViewChild('paginator', { static: true }) public paginator!: IgxPaginatorComponent;
  loading = false;
  event: any;

  itemsPerPage = 12;
  currentPage = 0;
  cards: Card[] = [];
  displayedCards: Card[] = [];

  selectedCard: Card | undefined;
  isEditing = false;
  @ViewChild('cardDialog', { static: false }) cardDialog!: IgxDialogComponent;
  newCardName = '';
  @Input() isOpen = false;
  @Output() closeModalEvent = new EventEmitter<boolean>();

  cardForm: FormGroup;

  constructor(private pokemonService: PokemonService, private cdr: ChangeDetectorRef,
    private fb: FormBuilder, private router: Router) {
    this.cardForm = this.fb.group({
      cardName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadData();
    this.cardForm = this.fb.group({
      cardName: ['', Validators.required],
    });
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  // Função para carregar os dados
  loadData() {
    this.loading = true;
    this.pokemonService.loadCards().subscribe({
      next: cards => {
        this.cards.unshift(...cards);
        this.updateDisplayedCards();
        this.loading = false;
      },
      error: error => {
        console.error('Erro ao obter baralhos:', error);
        this.loading = false;
      }
    });
  }

  removeCard(id: string): void {
    this.pokemonService.removeCard(id);
    this.cards = this.cards.filter(card => card.id !== id);
    this.updateDisplayedCards();
  }

  viewCardDetails(id: string): void { 
    this.router.navigate(['/card-detail', id]);
  }

  addCard() {
    this.selectedCard = undefined;
    this.isEditing = false;
    this.cardDialog.open();
  }

  editCard(id: string): void {
    this.selectedCard = this.cards.find(card => card.id === id);
    this.isEditing = true;
    this.cardForm.get('cardName')?.setValue(this.selectedCard?.name || '');
    this.cardDialog.open();
  }

  updateDisplayedCards() {
    if (this.paginator && this.paginator.page !== undefined) {
      const startIndex = this.paginator.page * this.itemsPerPage;
      const endIndex = Math.min(startIndex + this.itemsPerPage, this.cards.length);
      this.displayedCards = this.cards.slice(startIndex, endIndex);
    }
  }

  onItemsPerPageChange(event: number) {
    this.itemsPerPage = event;
    if (this.paginator) {
      this.paginator.perPage = this.itemsPerPage;
      this.paginator.page = 0;
      this.updateDisplayedCards();
    }
  }

  onSubmit() {
    if (this.cardForm.valid) {
      const newCardName = this.cardForm.value.cardName;

      if (this.isEditing && this.selectedCard) {
        // Editar um baralho existente
        this.selectedCard.name = newCardName;

        // Atualizar o baralho usando o serviço
        this.pokemonService.editCard(this.selectedCard.id, this.selectedCard);
      } else {
        // Criar um novo baralho com o nome fornecido
        const newCard: Card = {
          id: Math.random().toString(36).substring(7),
          name: newCardName,
        };

        // Adicionar o novo baralho no início da lista
        this.cards.unshift(newCard);

        // Adicione o novo baralho diretamente ao serviço
        this.pokemonService.addCard(newCard);
      }

      // Atualizar a exibição dos baralhos
      this.updateDisplayedCards();
      this.closeModal();
      this.cardForm.reset();
    }
  }


  closeModal() {
    this.isOpen = false;
    this.cardDialog.close();
    this.newCardName = '';
  }

  updateEditedName(): void {
    if (this.selectedCard) {
      const newName = this.cardForm.get('cardName')?.value.trim();
      const currentIndex = this.cards.indexOf(this.selectedCard);

      if (newName !== '') {
        // Atualiza apenas a parte editada do nome, mantendo o restante
        this.selectedCard.name = newName;
        this.cards[currentIndex] = this.selectedCard;
      } else {
        // Se o novo nome for em branco, redefina-o para o nome anterior
        this.cardForm.get('cardName')?.setValue(this.selectedCard.name);
      }
    }
  }
  createDeck(): void {
    this.router.navigate(['/create-deck']);
  }
}
