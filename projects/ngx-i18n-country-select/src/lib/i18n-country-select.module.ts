import { NgModule, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { I18nCountrySelectComponent } from './i18n-country-select.component';
import { CountrySelectComponent } from './country-select.component';

@NgModule({
  declarations: [I18nCountrySelectComponent, CountrySelectComponent],
  imports: [CommonModule, FormsModule],
  providers: [],
  exports: [I18nCountrySelectComponent, CountrySelectComponent],
})
export class I18nCountrySelectModule {
  static forRoot(): ModuleWithProviders<I18nCountrySelectModule> {
    return {
      ngModule: I18nCountrySelectModule,
    };
  }
}
