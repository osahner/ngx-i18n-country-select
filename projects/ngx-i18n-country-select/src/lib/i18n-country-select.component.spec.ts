/* eslint-disable @angular-eslint/component-selector */
import { TestBed, waitForAsync } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { I18nCountrySelectModule } from './i18n-country-select.module';
import { I18nCountrySelectService } from './i18n-country-select.service';

import { By } from '@angular/platform-browser';

@Component({ selector: 'i18n-test', template: '' })
class TestComponent {
  disabled;
  model;
}

let service: I18nCountrySelectService;

describe('I18nCountrySelectModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      providers: [I18nCountrySelectService],
      imports: [FormsModule, I18nCountrySelectModule.forRoot()],
    });
  });

  it(
    'should initialize languages',
    waitForAsync(() => {
      service = TestBed.inject(I18nCountrySelectService);
      service.use(['de', 'en', 'sv', 'fi']);
    })
  );

  it('should update select: model -> view', () => {
    const fixture = TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<i18n-country-select [(iso3166Alpha2)]="model" size="sm"></i18n-country-select>`,
      },
    }).createComponent(TestComponent);
    fixture.detectChanges();

    const comp = fixture.componentInstance;
    const hostElement = fixture.nativeElement;
    const select = fixture.debugElement.query(By.css('select'));

    let debugIdx = Math.floor(Math.random() * select.componentInstance.items.length);
    const debugCountry = select.componentInstance.items[debugIdx].value;
    ++debugIdx;
    comp.model = debugCountry;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(select.nativeElement.value).toEqual(`${debugIdx}: ${debugCountry}`);
    });
  });

  it('should update select: view -> model', () => {
    const fixture = TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<i18n-country-select [(iso3166Alpha2)]="model" size="sm"></i18n-country-select>`,
      },
    }).createComponent(TestComponent);
    fixture.detectChanges();

    const comp = fixture.componentInstance;
    const options = fixture.debugElement.queryAll(By.css('option'));
    const debugIdx = Math.floor(Math.random() * options.length);
    const event = document.createEvent('Event');

    event.initEvent('change', true, true);
    options[debugIdx].nativeElement.dispatchEvent(event);

    fixture.detectChanges();
    expect(`${debugIdx}: ${comp.model}`).toEqual(options[debugIdx].nativeElement.value);
  });

  it('should set required attribute', () => {
    const fixture = TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<i18n-country-select [(iso3166Alpha2)]="model" size="sm" [mandatory]="true"></i18n-country-select>`,
      },
    }).createComponent(TestComponent);
    fixture.detectChanges();

    const select = fixture.debugElement.query(By.css('select'));
    const hasRequired = Object.keys(select.attributes).includes('required');
    expect(hasRequired).toBeTruthy();
  });
});
