import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IgxDialogComponent, IgxSnackbarComponent } from 'igniteui-angular';
import { Card } from 'src/app/interface/card.inteface';
import { Deck } from 'src/app/interface/pokemon.interface';
import { PokemonService } from 'src/app/service/pokemon.service';
@Component({
  selector: 'app-deck-detail',
  templateUrl: './deck-detail.component.html',
  styleUrls: ['./deck-detail.component.scss']
})
export class DeckDetailComponent implements OnInit {
  deck: Deck | null = null;
  loading: boolean = false;
  deckCards: Card[] = [];

  @ViewChild('cardDialog', { static: false }) cardDialog!: IgxDialogComponent;
  cardForm: FormGroup;

  @ViewChild('snackbar', { static: true }) public snackbar!: IgxSnackbarComponent;
  public message: string = '';
  public actionText: string = 'Fechar';
  disabledButtonAdd: boolean = false;

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService,
    private router: Router, private fb: FormBuilder) {
    this.cardForm = this.fb.group({
      cardName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const deckId = this.route.snapshot.paramMap.get('id');
    if (deckId) {
      this.loading = true;
      this.pokemonService.getDeck(deckId).subscribe(deck => {
        this.deck = deck;
        this.deckCards = deck.cards || [];
        this.loading = false;
      });
    }
  }

  removeCardFromDeck(cardId: string): void {
    if (this.deck) {
      this.pokemonService.removeCardFromDeck(this.deck.id, cardId);
      const cardIndex = this.deckCards.findIndex(card => card.id === cardId);
      if (cardIndex !== -1) {
        this.deckCards.splice(cardIndex, 1);
      }
    }
  }

  openAddCardDialog() {
    this.cardDialog.open();
  }

  showMessage(message: string) {
    this.message = message;
    this.snackbar.open();
  }

  snackClick(event: any) {
    this.snackbar.close();
  }

  onAddCard() {
    //Verifica se o formulário é válido e se o deck está definido
    if (!this.cardForm.valid || !this.deck) return;

    //Verifica se o limite de cartas no baralho foi atingido
    if (this.deckCards.length >= 60) {
      this.showMessage("Você atingiu o limite máximo de 60 cartas para este baralho!");
      return;
    }

    const newCardName = this.cardForm.value.cardName;
    const cardsWithSameName = this.deckCards.filter(card => card.name === newCardName);

    //Verifica se a carta já existe no deck
    if (cardsWithSameName.length) {
      if (cardsWithSameName.length < 4) {
        const newCard: Card = {
          id: Math.random().toString(36).substring(7),
          name: newCardName
        };
        this.deckCards.push(newCard);
      } else {
        this.showMessage("Você não pode adicionar mais de 4 cartas com o mesmo nome!");
        return;
      }
    } else {
      const newCard: Card = {
        id: Math.random().toString(36).substring(7),
        name: newCardName
      };
      this.deckCards.push(newCard);
    }
    this.cardDialog.close();
    this.cardForm.reset();
  }

  saveDeck(){
    this.router.navigate(['/decks']);
  }
}
