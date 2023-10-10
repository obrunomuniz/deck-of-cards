import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 import { DeckDetailComponent } from './component/deck-detail/deck-detail.component';
import { CardListComponent } from './component/card-list/card-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/cards', pathMatch: 'full' },
  { path: 'cards', component: CardListComponent },
  { path: 'card-detail/:id', component: DeckDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
