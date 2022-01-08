/* eslint-disable @angular-eslint/component-selector */
import { TestBed, waitForAsync } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nCountrySelectModule } from './i18n-country-select.module';
import { I18nCountrySelectService } from './i18n-country-select.service';

import { By } from '@angular/platform-browser';

@Component({ selector: 'i18n-test', template: '' })
class TestComponent {
  disabled: boolean;
  form: FormGroup = new FormGroup({
    country: new FormControl('de'),
  });
}

let service: I18nCountrySelectService;

describe('I18nCountrySelectModule country-select-component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      providers: [I18nCountrySelectService],
      imports: [FormsModule, ReactiveFormsModule, I18nCountrySelectModule.forRoot()],
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
        template: `<form [formGroup]="form"><country-select formControlName="country"></country-select></form>`,
      },
    }).createComponent(TestComponent);
    fixture.detectChanges();
    const select = fixture.debugElement.query(By.css('select'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(select.nativeElement.value).toEqual('de');
    });
  });

  it('should update select: view -> model', () => {
    const fixture = TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<form [formGroup]="form"><country-select formControlName="country"></country-select></form>`,
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

    fixture.whenStable().then(() => {
      expect(comp.form.get('country')['value']).toEqual(options[debugIdx].nativeElement.value);
    });
  });
});
