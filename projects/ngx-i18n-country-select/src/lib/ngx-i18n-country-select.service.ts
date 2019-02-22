import { Injectable, ErrorHandler } from '@angular/core';
import * as i18nIsoCountries from 'i18n-iso-countries';

@Injectable({
  providedIn: 'root'
})
export class I18nCountrySelectService {
  constructor(private errorHandler: ErrorHandler) {}

  async use(localeIds: string[]) {
    await Promise.all(
      localeIds.map(async localeId => {
        try {
          const locale = await import(`i18n-iso-countries/langs/${localeId}.json`);
          i18nIsoCountries.registerLocale(locale);
        } catch (error) {
          this.errorHandler.handleError(error);
        }
      })
    );
  }
}
