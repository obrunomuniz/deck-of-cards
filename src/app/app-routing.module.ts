import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeckListComponent } from './component/deck-list/deck-list.component';
import { DeckDetailComponent } from './component/deck-detail/deck-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/decks', pathMatch: 'full' },
  { path: 'decks', component: DeckListComponent },
  { path: 'deck-detail/:id', component: DeckDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
