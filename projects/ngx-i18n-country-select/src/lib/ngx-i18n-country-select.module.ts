import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { I18nCountrySelectComponent } from './ngx-i18n-country-select.component';
import { I18nCountrySelectService } from './ngx-i18n-country-select.service';

@NgModule({
  declarations: [I18nCountrySelectComponent],
  imports: [CommonModule, FormsModule],
  providers: [],
  exports: [I18nCountrySelectComponent]
})
export class I18nCountrySelectModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: I18nCountrySelectModule,
      providers: [I18nCountrySelectService]
    };
  }
}
