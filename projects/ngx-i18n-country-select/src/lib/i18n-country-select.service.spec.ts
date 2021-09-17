import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { LOCALE_ID } from '@angular/core';

import { I18nCountrySelectService } from './i18n-country-select.service';

describe('NgxI18nCountrySelectService: INIT', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [{ provide: LOCALE_ID, useValue: 'de' }, I18nCountrySelectService]
    })
  );

  it('should be created', inject(
    [I18nCountrySelectService],
    (service: I18nCountrySelectService) => {
      expect(service).toBeTruthy();
      expect(service.getLocale()).toBe('en');
    }
  ));
});

describe('NgxI18nCountrySelectService: INIT', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [{ provide: LOCALE_ID, useValue: 'RO' }, I18nCountrySelectService]
    })
  );

  it('should be created', inject(
    [I18nCountrySelectService],
    (service: I18nCountrySelectService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('should get locale', waitForAsync(async () => {
    const service: I18nCountrySelectService = TestBed.get(I18nCountrySelectService);
    await service.use(['ro']);
    expect(service.getLocale()).toBe('ro');
  }));
});

describe('NgxI18nCountrySelectService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [{ provide: LOCALE_ID, useValue: 'de-DE' }, I18nCountrySelectService]
    })
  );

  it('should be created', inject(
    [I18nCountrySelectService],
    (service: I18nCountrySelectService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('should be created', () => {
    const service: I18nCountrySelectService = TestBed.get(I18nCountrySelectService);
    expect(service).toBeTruthy();
  });

  it('should initialize languages', waitForAsync(async () => {
    const service: I18nCountrySelectService = TestBed.get(I18nCountrySelectService);
    await service.use(['de', 'en', 'sv', 'fi']);
    expect(service.localeIds.length).toBe(4);
  }));

  it('should fail to load faulty locale', waitForAsync(async () => {
    const service: I18nCountrySelectService = TestBed.get(I18nCountrySelectService);
    await service.use(['nosuchlocale']);
    expect(service.localeIds.length).toBe(1); // default 'en' should be loaded
  }));
});
