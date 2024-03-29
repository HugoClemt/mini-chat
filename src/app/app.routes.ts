import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [{
    path: 'messenger',
    canActivate: [authGuard],
    loadComponent : () => import('./messenger/messenger.component').then(c => c.MessengerComponent)
},{
    path: "",
    pathMatch: "full",
    canActivate: [authGuard],
    loadComponent : () => import('./home/home.component').then(c => c.HomeComponent)
},{
    path: "project",
    canActivate: [authGuard],
    loadComponent : () => import('./project/project.component').then(c => c.ProjectComponent)
},{
    path: "login",
    loadComponent : () => import('./login/login.component').then(c => c.LoginComponent)
}];
