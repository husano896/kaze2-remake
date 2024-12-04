import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BattleService } from './battle/battle.service';
import { BattleListService } from './battle-list/battle-list.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./menu/menu.component').then(m => m.MenuComponent)
  },
  {
    path: 'library',
    loadComponent: () => import('./library/library.component').then(m => m.LibraryComponent)
  },
  {
    path: 'dragongame',
    loadComponent: () => import('./dragongame/dragongame.component').then(m => m.DragongameComponent)
  },
  {
    path: 'delete',
    loadComponent: () => import('./delete/delete.component').then(m => m.DeleteComponent)
  },
  {
    path: 'begin',
    loadComponent: () => import('./begin/begin.component').then(m => m.BeginComponent)
  },
  {
    path: 'dialogue',
    loadComponent: () => import('./dialogue/dialogue.component').then(m => m.DialogueComponent)
  },
  {
    path: 'ending',
    loadComponent: () => import('./ending/ending.component').then(m => m.EndingComponent)
  },
  {
    path: 'map',
    loadComponent: () => import('./map/map.component').then(m => m.MapComponent)
  },
  {
    path: 'battle',
    loadComponent: () => import('./battle/battle.component').then(m => m.BattleComponent),
    resolve: {
      data: BattleService
    }
  },
  {
    path: 'battle_list',
    loadComponent: () => import('./battle-list/battle-list.component').then(m => m.BattleListComponent),
    resolve: {
      data: BattleListService
    },

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
    path: 'debug_battle',
    loadComponent: () => import('./debug-battle/debug-battle.component').then(m => m.DebugBattleComponent)
  },
  {
    path: 'shop',
    loadComponent: () => import('./shop/shop.component').then(m => m.ShopComponent)
  },
  {
    path: 'inventory',
    loadComponent: () => import('./inventory/inventory.component').then(m => m.InventoryComponent)
  },
  {
    path: 'earn01',
    loadComponent: () => import('./earn01/earn01.component').then(m => m.Earn01Component)
  },
  {
    path: 'gameover',
    loadComponent: () => import('./gameover/gameover.component').then(m => m.GameoverComponent)
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
