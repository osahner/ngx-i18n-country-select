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

  it('should update select: model -> view', (done) => {
    const fixture = TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<form [formGroup]="form"><country-select formControlName="country"></country-select></form>`,
      },
    }).createComponent(TestComponent);
    fixture.detectChanges();
    const select = fixture.debugElement.query(By.css('select'));
    fixture.whenStable().then(() => {
      expect(select.nativeElement.value).toEqual('de');
      done();
    });
  });

  it('should update select: view -> model', (done) => {
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
      done();
    });
  });

  it('should add additional entries', (done) => {
    const fixture = TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<form [formGroup]="form"><country-select [additionalItems]="[{display: 'Online', value: ''}]" formControlName="country"></country-select></form>`,
      },
    }).createComponent(TestComponent);
    fixture.detectChanges();
    const options = fixture.debugElement.queryAll(By.css('option'));
    fixture.whenStable().then(() => {
      const found = options.find(opt => opt.nativeElement.value === '')
      expect(found).toBeDefined();
      done();
    });
  });

  it('should show only selected entries', (done) => {
    const fixture = TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<form [formGroup]="form"><country-select [onlyThisItems]="['de']" formControlName="country"></country-select></form>`,
      },
    }).createComponent(TestComponent);
    fixture.detectChanges();
    const options = fixture.debugElement.queryAll(By.css('option'));
    fixture.whenStable().then(() => {
      let found = options.find(opt => opt.nativeElement.value === 'en')
      expect(found).toBeUndefined();
      found = options.find(opt => opt.nativeElement.value === 'de')
      expect(found).toBeDefined();
      done();
    });
  });
});
