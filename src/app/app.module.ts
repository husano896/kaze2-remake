import { ErrorHandler, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { LoadingComponent } from '../components/loading/loading.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ApiService } from '@/api';
import { NumberToImageComponent } from '@/components/number-to-image/number-to-image.component';
import { AppService } from './app.service';
import { LanguageComponent } from '@/components/language/language.component';
import { AppErrorHandler } from './app.error.handler';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    LoadingComponent,
    NumberToImageComponent,
    LanguageComponent,
    FormsModule,
    RouterModule.forRoot(routes, {
      urlUpdateStrategy: "eager",
      paramsInheritanceStrategy: 'always',
      onSameUrlNavigation: 'reload',
      enableViewTransitions: true,
      scrollPositionRestoration: 'top',

    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerImmediately'
    })
  ],
  providers: [
    AppService,
    provideHttpClient(withInterceptorsFromDi()),
    { provide: ErrorHandler, useClass: AppErrorHandler },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
