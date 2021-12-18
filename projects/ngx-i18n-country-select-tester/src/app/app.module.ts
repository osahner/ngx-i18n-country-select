import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nCountrySelectModule, I18nCountrySelectService } from 'ngx-i18n-country-select';

import { AppComponent } from './app.component';

export function setUpI18nCountrySelect(service: I18nCountrySelectService) {
  return () => service.use(['de', 'en', 'sv', 'fi']);
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, I18nCountrySelectModule.forRoot()],
  providers: [
    { provide: LOCALE_ID, useValue: 'de' },
    {
      provide: APP_INITIALIZER,
      useFactory: setUpI18nCountrySelect,
      deps: [I18nCountrySelectService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
