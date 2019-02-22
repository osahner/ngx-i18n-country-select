import { TestBed, async, inject } from '@angular/core/testing';

import { I18nCountrySelectService } from './ngx-i18n-country-select.service';

describe('NgxI18nCountrySelectService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [I18nCountrySelectService]
    })
  );

  it('should be created', inject([I18nCountrySelectService], (service: I18nCountrySelectService) => {
    expect(service).toBeTruthy();
  }));

  it('should be created', () => {
    const service: I18nCountrySelectService = TestBed.get(I18nCountrySelectService);
    expect(service).toBeTruthy();
  });

  it('should initialize languages', async(async () => {
    const service: I18nCountrySelectService = TestBed.get(I18nCountrySelectService);
    await service.use(['de', 'en', 'sv', 'fi']);
    expect(service.localeIds.length).toBe(4);
  }));
});
