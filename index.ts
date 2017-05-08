import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { getNames } from 'i18n-iso-countries';

import { Iso3166Alpha2Directive } from './src/iso3166Alpha2Directive';
import { I18nCountrySelectComponent } from './src/ng2-i18n-country-select';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [I18nCountrySelectComponent, Iso3166Alpha2Directive],
  exports: [I18nCountrySelectComponent, Iso3166Alpha2Directive]
})
export class I18nCountrySelectModule {
}
