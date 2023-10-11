import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) { }

  ngOnInit(): void {
    const deckId = this.route.snapshot.paramMap.get('id');
    if (deckId) {
      this.loading = true;
      this.pokemonService.getDeck(deckId).subscribe(deck => {
        this.deck = deck;
        this.loading = false;
      });
    }
  }
}
