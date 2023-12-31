import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IgxButtonModule, IgxGridModule, IgxIconModule, IgxNavigationDrawerModule, IgxPaginatorModule, IgxRippleModule, IgxSwitchModule, IgxToggleModule, IPaginatorResourceStrings, changei18n, IgxDialogModule, IgxInputGroupModule, IgxNavbarModule, IgxCardModule, IgxSnackbarModule, IgxBadgeModule } from 'igniteui-angular';
import { DeckDetailComponent } from './component/deck-detail/deck-detail.component';
import { HeaderComponent } from './component/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PokemonService } from './service/pokemon.service';
import { HttpClientModule } from '@angular/common/http';
import { LoadingSpinnerComponent } from './component/loading-spinner/loading-spinner.component';
import { DeckListComponent } from './component/deck-list/deck-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DeckListComponent,
    DeckDetailComponent,
    HeaderComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    IgxButtonModule,
    IgxSwitchModule,
    FormsModule,
    HttpClientModule, 
    IgxIconModule,
    IgxNavigationDrawerModule,
    IgxRippleModule,
    IgxToggleModule,
    IgxPaginatorModule,
    IgxGridModule,
    IgxDialogModule,
    IgxIconModule, 
    IgxInputGroupModule,
    ReactiveFormsModule,
    IgxNavbarModule,
    IgxCardModule,
    IgxSnackbarModule,
    IgxBadgeModule
  ],
  providers: [PokemonService, ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    // Strings de traducao do componente de paginacao
    const paginatorResourceStrings: IPaginatorResourceStrings = {
      igx_paginator_label: 'Registros por página:',
      igx_paginator_first_page_button_text: 'Primeira Página',
      igx_paginator_last_page_button_text: 'Última Página',
      igx_paginator_next_page_button_text: 'Próxima Página',
      igx_paginator_previous_page_button_text: 'Página Anterior',
      igx_paginator_pager_text: 'de',
    }; 
    changei18n(paginatorResourceStrings as any);
  }
}
