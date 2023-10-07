import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeckListComponent } from './component/deck-list/deck-list.component';
import { DeckEditComponent } from './component/deck-edit/deck-edit.component';
import { DeckDetailComponent } from './component/deck-detail/deck-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/decks', pathMatch: 'full' },
  { path: 'decks', component: DeckListComponent },
  { path: 'decks/new', component: DeckEditComponent },
  { path: 'decks/:id/edit', component: DeckEditComponent },
  { path: 'decks/:id', component: DeckDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
