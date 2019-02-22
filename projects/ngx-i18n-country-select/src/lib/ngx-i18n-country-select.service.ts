import { Injectable, ErrorHandler, Inject, LOCALE_ID } from '@angular/core';
import * as i18nIsoCountries from 'i18n-iso-countries';

export interface IOption {
  display: string;
  value: string;
}
@Injectable({
  providedIn: 'root'
})
export class I18nCountrySelectService {
  localeIds = ['en'];

  constructor(@Inject(LOCALE_ID) private localeId: string, private errorHandler: ErrorHandler) {}

  async use(localeIds: string[]) {
    this.localeIds = [...localeIds];
    await Promise.all(
      this.localeIds.map(async localeId => {
        try {
          const locale = await import(`i18n-iso-countries/langs/${localeId}.json`);
          i18nIsoCountries.registerLocale(locale);
        } catch (error) {
          this.errorHandler.handleError(error);
        }
      })
    );
  }

  loadCountries(): IOption[] {
    const iso3166 = i18nIsoCountries.getNames(this.getLocale());
    const items: IOption[] = [];

    for (const key of Object.keys(iso3166)) {
      items.push({ display: iso3166[key], value: key.toLowerCase() });
    }

    return items.sort((a: any, b: any) => a.display.localeCompare(b.display));
  }

  protected getLocale(): string {
    let locale: string;
    if (this.localeId.length > 2) {
      // convert Locale from ISO 3166-2 to ISO 3166 alpha2
      locale = this.localeId.toLowerCase().slice(0, 2);
    } else {
      locale = this.localeId.toLowerCase();
    }
    // return locale only if loaded else first available
    if (this.localeIds.indexOf(locale) > -1) {
      return locale;
    } else {
      return this.localeIds[0];
    }
  }
}
