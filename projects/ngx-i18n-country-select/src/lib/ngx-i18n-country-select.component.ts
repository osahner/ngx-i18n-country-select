import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  LOCALE_ID,
  OnDestroy,
  Output
} from '@angular/core';

import * as i18nIsoCountries from 'i18n-iso-countries';

@Component({
  selector: 'i18n-country-select',
  template: `
    <select
      name="theme"
      [class]="'form-control' + (size ? ' form-control-' + size : '')"
      [ngModel]="iso3166Alpha2"
      (ngModelChange)="change($event)"
      [disabled]="!editable"
    >
      <option [ngValue]="null">{{ defaultLabel }}</option>
      <option *ngFor="let country of myCountries" [ngValue]="country.value">{{ country.display }}</option>
    </select>
  `
})
export class I18nCountrySelectComponent implements AfterViewChecked, OnDestroy {
  public defaultLabel: string;

  private sub: any;

  @Input()
  public iso3166Alpha2: string;

  @Input()
  public size: 'sm' | 'lg';

  @Input()
  public locale = 'de-DE';

  @Input()
  public pleaseChoose = 'Please choose...';

  @Input()
  public editable = true;

  @Output()
  public iso3166Alpha2Change = new EventEmitter();

  public myCountries: any[] = [];

  constructor(private cdRef: ChangeDetectorRef, @Inject(LOCALE_ID) private localeId: string) {
    let locale = 'en';

    if (this.localeId.length > 2) {
      // convert Locale from ISO 3166-2 to ISO 3166 alpha2
      locale = this.localeId.toLowerCase().slice(0, 2);
    } else {
      locale = this.localeId.toLowerCase();
    }
    this.loadCountries(locale);

    this.defaultLabel = this.pleaseChoose;
  }

  private loadCountries(locale: string): void {
    const iso3166 = i18nIsoCountries.getNames(locale);

    this.myCountries = [];

    for (const key of Object.keys(iso3166)) {
      this.myCountries.push({ display: iso3166[key], value: key.toLowerCase() });
    }
    // sort
    this.myCountries.sort((a: any, b: any) => a.display.localeCompare(b.display));
  }

  public change(newValue: string): void {
    this.iso3166Alpha2 = newValue;
    this.iso3166Alpha2Change.emit(newValue);
  }

  ngAfterViewChecked() {
    if (this.iso3166Alpha2) {
      this.iso3166Alpha2 = this.iso3166Alpha2.toLowerCase();
    }
    this.cdRef.detectChanges(); // avoid ExpressionChangedAfterItHasBeenCheckedError
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = null;
    }
  }
}
