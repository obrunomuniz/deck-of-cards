import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IgxNavigationDrawerComponent, IgxToggleDirective } from 'igniteui-angular';
import { PokemonService } from 'src/app/service/pokemon.service';
import { Location } from '@angular/common';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @ViewChild(IgxNavigationDrawerComponent, { static: true })
    public drawer: IgxNavigationDrawerComponent | null = null;
    public loading = false;

    @ViewChild(IgxToggleDirective, { static: true })
    private toggleButton: IgxToggleDirective | null = null;

    public navItems = [
        { name: 'view_module', text: 'Baralhos', route: '/decks' },
        { name: 'add_box', text: 'Criar Baralho', route: '/decks/new' }
    ]; 

    public selected = 'Baralhos'; 
     showBackButton = false;  

    public navigateTo(item: { text: string, route: string }) {
        this.selected = item.text;
        if (this.drawer) {
            this.drawer.close();
        }
        this.router.navigate([item.route]);
    }
    
    isDarkMode = false;
    isOpen = false;
    pin = true; 

    constructor(private pokemonService: PokemonService, private router: Router,
        private location: Location) {
            this.router.events.subscribe((event) => {
                if (event instanceof NavigationEnd) {
                    //Se a URL for '/deck-detail', mostre o botão "Voltar"
                    this.showBackButton = event.url.startsWith('/deck-detail');
                }
            });
        }

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

    toggleDrawer(): void {
        if (this.toggleButton) {
            this.toggleButton.toggle();
        }
    }

    voltar(): void {
        this.location.back();
    }
}
