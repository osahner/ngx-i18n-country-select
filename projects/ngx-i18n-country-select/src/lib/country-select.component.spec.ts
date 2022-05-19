/* eslint-disable @angular-eslint/component-selector */
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { APP_INITIALIZER, Component, LOCALE_ID } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nCountrySelectModule } from './i18n-country-select.module';
import { I18nCountrySelectService } from './i18n-country-select.service';

import { By } from '@angular/platform-browser';
import { CountrySelectComponent } from './country-select.component';

export function setUpI18nCountrySelect(service: I18nCountrySelectService) {
  return () => service.use(['de']);
}

describe('I18nCountrySelectModule', () => {
  let component: CountrySelectComponent;
  let fixture: ComponentFixture<CountrySelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountrySelectComponent],
      providers: [
        { provide: LOCALE_ID, useValue: 'de' },
        {
          provide: APP_INITIALIZER,
          useFactory: setUpI18nCountrySelect,
          deps: [I18nCountrySelectService],
          multi: true,
        },
        I18nCountrySelectService,
      ],
      imports: [FormsModule, ReactiveFormsModule, I18nCountrySelectModule],
    });
    fixture = TestBed.createComponent(CountrySelectComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  /*
  it('should update select: model -> view', fakeAsync(() => {
    fixture.detectChanges();
    const select = fixture.debugElement.query(By.css('select'));
    fixture.whenStable().then(() => {
      expect(select.nativeElement.value).toEqual('de');
    });
  }));

  it('should update select: view -> model', fakeAsync(() => {
    fixture.detectChanges();

    const options = fixture.debugElement.queryAll(By.css('option'));
    const debugIdx = Math.floor(Math.random() * options.length);
    const event = document.createEvent('Event');

    event.initEvent('change', true, true);
    options[debugIdx].nativeElement.dispatchEvent(event);

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.form.get('country')['value']).toEqual(options[debugIdx].nativeElement.value);
    });
  }));

  it('should add additional entries', fakeAsync(() => {
    fixture.detectChanges();
    const options = fixture.debugElement.queryAll(By.css('option'));
    fixture.whenStable().then(() => {
      const found = options.find((opt) => opt.nativeElement.value === '');
      expect(found).toBeDefined();
    });
  }));

  it('should show only selected entries', (done) => {
    component.onlyThisItems = ['', 'de'];
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const options = fixture.debugElement.queryAll(By.css('option'));
      let found = options.find((opt) => opt.nativeElement.value === 'en');
      expect(found).toBeUndefined();
      found = options.find((opt) => opt.nativeElement.value === 'de');
      expect(found).toBeDefined();
      done();
    });
  });
   */

});
