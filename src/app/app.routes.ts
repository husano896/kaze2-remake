import { ActivatedRouteSnapshot, GuardResult, MaybeAsync, RouterStateSnapshot, Routes } from '@angular/router';

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
        path: 'migrate_gamecan',
        loadComponent: () => import('./pages/index/migrate-gamecan/migrate-gamecan.component').then(m => m.MigrateGamecanComponent)
    },
    {
        path: 'welcome',
        loadComponent: () => import('./pages/index/welcome/welcome.component').then(m => m.WelcomeComponent)
    },
    {
        path: 'faq',
        loadComponent: () => import('./pages/index/faq/faq.component').then(m => m.FaqComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/index/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'developer_story',
        loadComponent: () => import('./pages/index/developer-story/developer-story.component').then(m => m.DeveloperStoryComponent)
    },
    {
        path: 'game',
        loadChildren: () => import('./pages/game/game.module').then(m => m.GameModule),
    },
    {
        path: 'chat',
        loadComponent: () => import('./pages/chat/chat.component').then(m => m.ChatComponent),

    },
    /** Google OAuth 要求 */
    {
        path: 'service',
        loadChildren: () => import('./pages/service/service.component').then(c => c.ServiceComponent)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
