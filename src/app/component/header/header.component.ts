import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IgxNavigationDrawerComponent, IgxToggleDirective } from 'igniteui-angular';
import { PokemonService } from 'src/app/service/pokemon.service';
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

    constructor(private pokemonService: PokemonService, private router: Router) {}

    ngOnInit() {
        this.isDarkMode = this.pokemonService.getTheme() === 'dark';
       // this.loadData();
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

    // Função para carregar os dados
    /* loadData() {
        this.loading = true; // Ative o indicador de carregamento
        this.pokemonService.getDecks()
            .pipe(
                catchError((error) => {
                    console.error('Erro ao carregar os dados:', error);
                    return throwError(() => new Error('test'));
                }),
                finalize(() => {
                    this.loading = false; // Desative o indicador de carregamento quando os dados estiverem prontos ou ocorrer um erro
                })
            )
            .subscribe((decks) => {
                // Aqui você recebe os dados dos baralhos
            });
    } */
}
