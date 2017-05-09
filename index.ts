import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { I18nCountrySelectComponent } from './src/ngx-i18n-country-select';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [I18nCountrySelectComponent],
  exports: [I18nCountrySelectComponent]
})
export class I18nCountrySelectModule {
}
