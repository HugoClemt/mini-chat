import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';


@Component({
    selector: 'app-root',
    standalone: true,
    template: `
    <div class="p-2 w-full flex gap-2 bg-sky-900 text-white">
      @if (!isAuth){
        <a class="hover:text-sky-200" routerLink="/login">Se connecter</a>
      } @else {
        <a class="hover:text-sky-200" routerLink="/">Accueil</a>
        <a class="hover:text-sky-200" routerLink="/messenger">Chat</a>
        <a class="hover:text-sky-200" routerLink="/project">Projet</a>
        <span class="hover:text-sky-200" (click)="authService.logout()">Se déconnecter</span>
      }
    </div>
      <router-outlet />
    `,
    imports: [
        RouterOutlet,
        RouterModule,
        CommonModule,
    ],
    styles: [`
      :host {
        @apply block h-screen;
      }
    `]
})
export class AppComponent {
    authService = inject(AuthService);
    isAuth = false;

    ngOnInit() {
        this.authService.isAuth$.subscribe(e => {
            this.isAuth = e;
        })
    }
}
