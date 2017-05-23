import {
  Component, EventEmitter, Inject, Input, LOCALE_ID, Output, AfterViewChecked,
  ChangeDetectorRef, Optional, OnDestroy
} from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

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
export class I18nCountrySelectComponent implements AfterViewChecked, OnDestroy {
  private validLocales = ['ar', 'cs', 'de', 'en', 'es', 'et', 'fi', 'fr', 'hu', 'it', 'nb', 'nl', 'nn', 'pl', 'pt',
    'ru', 'sv', 'tr', 'uk', 'zh'];
  private pleaseChoose = {
    en: 'Please choose...',
    de: 'Bitte auswählen...',
    fr: 'Choisissez s\'il vous plaît...',
    es: 'Elija por favor...',
    it: 'si prega di scegliere...',
    nl: 'Gelieve te kiezen...',
    pl: 'proszę wybrać...'
  };
  private defaultValue = '';

  private sub: any;

  @Input()
  public iso3166Alpha2: string;
  @Input()
  public size: 'sm' | 'lg';

  @Output()
  public iso3166Alpha2Change = new EventEmitter();

  public myCountries: any[] = [];

  constructor(private cdRef: ChangeDetectorRef,
              @Inject(LOCALE_ID) private localeId: string,
              @Optional() private translate: TranslateService) {
    let locale: string = 'en';

    if (this.translate) {
      locale = this.translate.currentLang;
    } else if (this.localeId) {
      locale = this.localeId;
    }
    if (locale.length > 2) {
      // convert Locale from ISO 3166-2 to ISO 3166 alpha2
      locale = locale.toLowerCase().slice(0, 2);
    } else {
      locale = locale.toLowerCase();
    }
    if (this.validLocales.indexOf(locale) > -1) {
      this.loadCountries(locale);
    } else {
      this.loadCountries('en'); // fallback locale is english
    }

    if (this.translate) {
      this.sub = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        this.loadCountries(event.lang);
      });
    }
  }

  private loadCountries(locale: string): void {
    const iso3166 = getNames(locale);

    this.myCountries = [];

    for (const key of Object.keys(iso3166)) {
      this.myCountries.push({ display: iso3166[key], value: key.toLowerCase() });
    }
    // sort
    this.myCountries.sort((a: any, b: any) => a.display.localeCompare(b.display));
    this.myCountries.unshift({
      display: this.pleaseChoose.hasOwnProperty(locale) ? this.pleaseChoose[locale] : this.pleaseChoose.en,
      value: this.defaultValue
    });
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
