import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./menu/menu.component').then(m => m.MenuComponent)
  },
  {
    path: 'dragongame',
    pathMatch: 'full',
    loadComponent: () => import('./dragongame/dragongame.component').then(m => m.DragongameComponent)
  },
  {
    path: 'delete',
    pathMatch: 'full',
    loadComponent: () => import('./delete/delete.component').then(m => m.DeleteComponent)
  },
  {
    path: '**',
    redirectTo: ''
  },

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class GameModule { }
