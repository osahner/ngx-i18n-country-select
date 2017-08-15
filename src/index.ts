import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { I18nCountrySelectComponent } from './ngx-i18n-country-select.component';

export * from './ngx-i18n-country-select.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    I18nCountrySelectComponent
  ],
  exports: [
    I18nCountrySelectComponent
  ]
})
export class I18nCountrySelectModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: I18nCountrySelectModule,
      providers: []
    };
  }
}
