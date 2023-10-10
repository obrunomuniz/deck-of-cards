import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 import { CardListComponent } from './component/card-list/card-list.component';
import { CardDetailComponent } from './component/card-detail/card-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/cards', pathMatch: 'full' },
  { path: 'cards', component: CardListComponent },
  { path: 'card-detail/:id', component: CardDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
