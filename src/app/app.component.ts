import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';


@Component({
    selector: 'app-root',
    standalone: true,
    template: `
    <div class="p-2 w-full flex gap-2 bg-sky-900 text-white">
      <a class="hover:text-sky-200" routerLink="/">Accueil</a>
      <a class="hover:text-sky-200" routerLink="/messenger">Chat</a>
      <a class="hover:text-sky-200" routerLink="/project">Projet</a>
      <a class="hover:text-sky-200" routerLink="/login">Se connecter</a>
    </div>
      <router-outlet />
    `,
    imports: [
        RouterOutlet,
        RouterModule,
        CommonModule,
    ]
})
export class AppComponent {

}
