import { Injectable, ErrorHandler, Inject, LOCALE_ID } from '@angular/core';
import { getNames, registerLocale } from 'i18n-iso-countries';

export interface IOption {
  display: string;
  value: string | null;
}
@Injectable({
  providedIn: 'root',
})
export class I18nCountrySelectService {
  localeIds = ['en'];

  constructor(@Inject(LOCALE_ID) public glocaleId: string, private errorHandler: ErrorHandler) {}

  async use(localeIds: string[]) {
    this.localeIds = [...localeIds];
    await Promise.all(
      this.localeIds.map(async (localeId) => {
        try {
          const locale = await import(`i18n-iso-countries/langs/${localeId}.json`);
          registerLocale(locale.default);
        } catch (error) {
          this.errorHandler.handleError(error);
        }
      })
    );
  }

  loadCountries(locale?: string): IOption[] {
    return Object.entries(getNames(this.getLocale(locale)))
      .map(([key, value]) => [key, Array.isArray(value) ? value[0] : value])
      .sort((a, b) => a[1].localeCompare(b[1]))
      .map((country) => ({ display: country[1], value: country[0].toLowerCase() })) as IOption[];
  }

  getLocale(locale: string = 'de'): string {
    let l: string;

    if (locale.length > 2) {
      // convert Locale from ISO 3166-2 to ISO 3166 alpha2
      l = locale?.toLowerCase().slice(0, 2);
    } else {
      l = locale?.toLowerCase();
    }
    // return locale only if loaded else first available
    if (this.localeIds.indexOf(l) > -1) {
      return l;
    } else {
      return this.localeIds[0];
    }
  }
}
