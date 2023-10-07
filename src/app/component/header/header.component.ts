import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IgxNavigationDrawerComponent } from 'igniteui-angular';
import { PokemonService } from 'src/app/service/pokemon.service';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @ViewChild(IgxNavigationDrawerComponent, { static: true })
    public drawer: IgxNavigationDrawerComponent | null = null;

    public navItems = [
        { name: 'view_module', text: 'Baralhos', route: '/decks' },
        { name: 'add_box', text: 'Criar Baralho', route: '/decks/new' }
    ]; 

    isOpen = false;
    public selected = 'Baralhos';

    public navigateTo(item: { text: string, route: string }) {
        this.selected = item.text;
        if (this.drawer) {
            this.drawer.close();
        }
        this.router.navigate([item.route]);
    }
    
    isDarkMode = false; 
    pin = true; 

    constructor(private pokemonService: PokemonService, private router: Router) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
              const activeNavItem = this.navItems.find(item => item.route === event.url);
              if (activeNavItem) {
                this.selected = activeNavItem.text;
              }
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
        this.isOpen = !this.isOpen;
    }
}
