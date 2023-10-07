import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IgxButtonModule, IgxIconModule, IgxNavigationDrawerModule, IgxRippleModule, IgxSwitchModule, IgxToggleModule } from 'igniteui-angular';
import { DeckListComponent } from './component/deck-list/deck-list.component';
import { DeckEditComponent } from './component/deck-edit/deck-edit.component';
import { DeckDetailComponent } from './component/deck-detail/deck-detail.component';
import { HeaderComponent } from './component/header/header.component';
import { FormsModule } from '@angular/forms';
import { PokemonService } from './service/pokemon.service';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    DeckListComponent,
    DeckEditComponent,
    DeckDetailComponent,
    HeaderComponent
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
    IgxToggleModule
  ],
  providers: [PokemonService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
