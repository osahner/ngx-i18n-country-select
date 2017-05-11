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
  @Input()
  public iso3166Alpha2: string;
  @Input()
  public size: 'sm' | 'lg';
  @Output()
  public iso3166Alpha2Change = new EventEmitter();

  public myCountries: any[] = [];

  constructor(private cdRef: ChangeDetectorRef,
              @Inject(LOCALE_ID) private locale: string) {
    // fallback locale is english
    let iso3166Alpha2 = 'en';
    if (this.locale && this.locale.length > 2) {
      // convert Locale from ISO 3166-2 to ISO 3166 alpha2
      iso3166Alpha2 = this.locale.slice(0, 2);
    }
    const iso3166 = getNames(iso3166Alpha2);

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
