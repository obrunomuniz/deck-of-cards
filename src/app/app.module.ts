import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IgxButtonModule, IgxGridModule, IgxIconModule, IgxNavigationDrawerModule, IgxPaginatorModule, IgxRippleModule, IgxSwitchModule, IgxToggleModule  } from 'igniteui-angular';
import { DeckListComponent } from './component/deck-list/deck-list.component';
import { DeckEditComponent } from './component/deck-edit/deck-edit.component';
import { DeckDetailComponent } from './component/deck-detail/deck-detail.component';
import { HeaderComponent } from './component/header/header.component';
import { FormsModule } from '@angular/forms';
import { PokemonService } from './service/pokemon.service';
import { HttpClientModule } from '@angular/common/http';
import { LoadingSpinnerComponent } from './component/loading-spinner/loading-spinner.component';
@NgModule({
  declarations: [
    AppComponent,
    DeckListComponent,
    DeckEditComponent,
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
  ],
  providers: [PokemonService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
