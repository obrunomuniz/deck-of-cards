import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IgxDialogComponent } from 'igniteui-angular';
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

  onAddCard() {
    if (this.cardForm.valid) {
      const newCardName = this.cardForm.value.cardName;

      const newCard: Card = {
        id: Math.random().toString(36).substring(7),
        name: newCardName
      };

      if (this.deck) {
        this.pokemonService.addCardToDeck(this.deck.id, newCard);
        this.deckCards.push(newCard);
      }

      this.cardDialog.close();
      this.cardForm.reset();
    }
  }
}
