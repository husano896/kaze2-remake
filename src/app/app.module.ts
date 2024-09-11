import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { LoadingComponent } from '../components/loading/loading.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ApiService } from './api';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    LoadingComponent,
    RouterModule.forRoot(routes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
