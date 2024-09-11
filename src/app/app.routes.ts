import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./pages/index/index.component').then(m => m.IndexComponent)
    },
    {
        path: 'index_doc/1',
        loadComponent: () => import('./pages/index/index-doc1/index-doc1.component').then(m => m.IndexDoc1Component)
    },
    {
        path: 'index_doc/2',
        loadComponent: () => import('./pages/index/index-doc2/index-doc2.component').then(m => m.IndexDoc2Component)
    },
    {
        path: 'index_doc/3',
        loadComponent: () => import('./pages/index/index-doc3/index-doc3.component').then(m => m.IndexDoc3Component)
    },
    {
        path: 'credits',
        loadComponent: () => import('./pages/index/credits/credits.component').then(m => m.CreditsComponent)
    },
    {
        path: 'new_save',
        loadComponent: () => import('./pages/index/new-save/new-save.component').then(m => m.NewSaveComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/index/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'game',
        loadChildren: () => import('./pages/game/game.module').then(m => m.GameModule)
    },

    {
        path: '**',
        redirectTo: ''
    }
];
