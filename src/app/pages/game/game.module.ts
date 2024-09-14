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
    path: 'begin',
    pathMatch: 'full',
    loadComponent: () => import('./begin/begin.component').then(m => m.BeginComponent)
  },
  {
    path: 'dialogue',
    pathMatch: 'full',
    loadComponent: () => import('./dialogue/dialogue.component').then(m => m.DialogueComponent)
  },
  {
    path: 'ending',
    pathMatch: 'full',
    loadComponent: () => import('./ending/ending.component').then(m => m.EndingComponent)
  },
  {
    path: 'battle',
    loadComponent: () => import('./battle/battle.component').then(m => m.BattleComponent)
  },
  {
    path: 'debug_events',
    loadComponent: () => import('./debug-events/debug-events.component').then(m => m.DebugEventsComponent)
  },
  {
    path: 'debug_audio',
    loadComponent: () => import('./debug-audio/debug-audio.component').then(m => m.DebugAudioComponent)
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
