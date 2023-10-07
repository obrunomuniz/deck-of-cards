import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/service/pokemon.service';
 
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    isDarkMode = false;

    constructor(private pokemonService: PokemonService) {}

    ngOnInit() {
        this.isDarkMode = this.pokemonService.getTheme() === 'dark';
    }

    changeTheme() {
        if (this.isDarkMode) {
            this.pokemonService.setTheme('dark');
        } else {
            this.pokemonService.setTheme('light');
        }
    }
}
