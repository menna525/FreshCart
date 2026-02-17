import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideSweetAlert2 } from "@sweetalert2/ngx-sweetalert2";
import { provideToastr } from 'ngx-toastr';
import { headersInterceptor } from './core/interceptors/headers/headers-interceptor';
import { errorsInterceptor } from './core/interceptors/errors/errors-interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from './core/interceptors/loading/loading-interceptor';
import {provideTranslateService, } from "@ngx-translate/core";
import {provideTranslateHttpLoader} from "@ngx-translate/http-loader";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch() , withInterceptors([headersInterceptor , errorsInterceptor , loadingInterceptor])),
     provideHttpClient(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',
        suffix: '.json'
      }),
      fallbackLang: 'ar',
      lang: 'en'
    }),
    provideSweetAlert2({
            // Optional configuration
            fireOnInit: false,
            dismissOnDestroy: true,
        }),
         provideToastr(),
         provideAnimations(),
         importProvidersFrom(NgxSpinnerModule),
  ]
};
