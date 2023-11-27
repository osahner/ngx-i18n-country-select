import { enableProdMode, LOCALE_ID, APP_INITIALIZER, importProvidersFrom } from '@angular/core';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideI18nCountrySelect } from '../../ngx-i18n-country-select/src/public_api';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, FormsModule, ReactiveFormsModule),
    { provide: LOCALE_ID, useValue: 'de' },
    provideI18nCountrySelect(['de', 'en', 'sv', 'fi']),
  ],
}).catch((err) => console.error(err));
