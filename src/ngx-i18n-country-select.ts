import {
  Component, EventEmitter, Inject, Input, LOCALE_ID, Output, AfterViewChecked,
  ChangeDetectorRef
} from '@angular/core';

import { getNames } from 'i18n-iso-countries';

@Component({
  selector: 'i18n-country-select',
  template: `
    <select name="theme" [class]="'form-control' + (size ? ' form-control-' + size : '')"
      [ngModel]="iso3166Alpha2" (ngModelChange)="change($event)">
      <option *ngFor="let country of myCountries" [ngValue]="country.value">{{country.display}}</option>
    </select>
  `
})
export class I18nCountrySelectComponent implements AfterViewChecked {
  private validLocales = ['ar', 'cs', 'de', 'en', 'es', 'et', 'fi', 'fr', 'hu', 'it', 'nb', 'nl', 'nn', 'pl', 'pt',
    'ru', 'sv', 'tr', 'uk', 'zh'];

  @Input()
  public iso3166Alpha2: string;
  @Input()
  public size: 'sm' | 'lg';
  @Output()
  public iso3166Alpha2Change = new EventEmitter();

  public myCountries: any[] = [];

  constructor(private cdRef: ChangeDetectorRef,
              @Inject(LOCALE_ID) private localeId: string) {
    let locale: string;
    if (this.localeId) {
      if (this.localeId.length > 2) {
        // convert Locale from ISO 3166-2 to ISO 3166 alpha2
        locale = this.localeId.toLowerCase().slice(0, 2);
      } else {
        locale = this.localeId.toLowerCase();
      }
    }
    if (this.validLocales.indexOf(locale) > -1) {
      this.loadCountries(locale);
    } else {
      this.loadCountries('en'); // fallback locale is english
    }
  }

  private loadCountries(locale: string): void {
    const iso3166 = getNames(locale);

    for (const key of Object.keys(iso3166)) {
      this.myCountries.push({ display: iso3166[key], value: key.toLowerCase() });
    }
    // sort
    this.myCountries.sort((a: any, b: any) => a.display.localeCompare(b.display));
  }

  ngAfterViewChecked() {
    if (this.iso3166Alpha2) {
      this.iso3166Alpha2 = this.iso3166Alpha2.toLowerCase();
    }
    this.cdRef.detectChanges(); // avoid ExpressionChangedAfterItHasBeenCheckedError
  }

  public change(newValue: string): void {
    this.iso3166Alpha2 = newValue;
    this.iso3166Alpha2Change.emit(newValue);
  }
}
