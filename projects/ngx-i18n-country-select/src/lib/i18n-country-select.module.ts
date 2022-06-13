import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CountrySelectComponent } from './country-select.component';

@NgModule({
  declarations: [CountrySelectComponent],
  imports: [CommonModule, FormsModule],
  providers: [],
  exports: [CountrySelectComponent],
})
export class I18nCountrySelectModule { }
