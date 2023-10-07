import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IgxButtonModule } from 'igniteui-angular';
import { DeckListComponent } from './component/deck-list/deck-list.component';
import { DeckEditComponent } from './component/deck-edit/deck-edit.component';
import { DeckDetailComponent } from './component/deck-detail/deck-detail.component';
@NgModule({
  declarations: [
    AppComponent,
    DeckListComponent,
    DeckEditComponent,
    DeckDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    IgxButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
