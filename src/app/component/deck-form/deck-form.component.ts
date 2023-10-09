import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from 'src/app/interface/pokemon.interface';

@Component({
  selector: 'app-deck-form',
  templateUrl: './deck-form.component.html',
  styleUrls: ['./deck-form.component.scss']
})
export class DeckFormComponent {
  @Input() isOpen = false;
  @Output() closeModalEvent = new EventEmitter<boolean>();
  @Output() deckSaved: EventEmitter<Card> = new EventEmitter<Card>();

  @Input() deck: Card | undefined;
  @Output() deckChange = new EventEmitter<Card | undefined>();

  newCardName = '';

  closeModal() {
    this.isOpen = false;
    this.closeModalEvent.emit(false);
    this.newCardName = ''; // Limpar o campo do nome do card ao fechar o modal
  }

  onSubmit() {
    // Validar e salvar o novo card aqui
    if (this.newCardName) {
      this.closeModal();
    }
  }
}
