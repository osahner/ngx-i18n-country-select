import { APP_INITIALIZER, makeEnvironmentProviders } from '@angular/core';
import { I18nCountrySelectService } from './i18n-country-select.service';

export function provideI18nCountrySelect(langs: string[]) {
  return makeEnvironmentProviders([
    {
      provide: APP_INITIALIZER,
      useFactory: (service: I18nCountrySelectService) => {
        return () => service.use(langs);
      },
      deps: [I18nCountrySelectService],
      multi: true,
    },
  ]);
}
