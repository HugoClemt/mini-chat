import { Routes } from '@angular/router';

export const routes: Routes = [{
    path: 'messenger',
    loadComponent : () => import('./messenger/messenger.component').then(c => c.MessengerComponent)
},{
    path: "",
    pathMatch: "full",
    loadComponent : () => import('./home/home.component').then(c => c.HomeComponent)
},{
    path: "project",
    loadComponent : () => import('./project/project.component').then(c => c.ProjectComponent)
}];
