import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Card } from 'src/app/interface/pokemon.interface';
import { PokemonService } from 'src/app/service/pokemon.service';
@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent implements OnInit {
  card: Card | null = null;
  loading: boolean = false;
  deckCards: Card[] = [];  // As cartas que estão dentro do baralho atual

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) { }

  ngOnInit(): void {
    const cardId = this.route.snapshot.paramMap.get('id');
    if (cardId) {
      this.loading = true;
      this.pokemonService.getCard(cardId).subscribe(card => {
        this.card = card;
        this.loading = false;
      });
    }
    this.getDeckCards();
  }

  getDeckCards(): void {
    // Lógica para obter as cartas que pertencem a este baralho
    // Atualize a variável 'deckCards'
  }

  removeCardFromDeck(cardId: string): void {
    // Lógica para remover uma carta do baralho
  }

  addCardsToDeck(): void {
    // Lógica para adicionar cartas ao baralho
    // Você pode redirecionar o usuário para uma tela de seleção ou mostrar um modal/popup para a seleção
  }
}
