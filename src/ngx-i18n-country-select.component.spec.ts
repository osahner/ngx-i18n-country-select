import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { I18nCountrySelectModule } from './';
import { By } from '@angular/platform-browser';

@Component({ selector: 'test-cmp', template: '' })
class TestComponent {
  disabled;
  model;
}


describe('I18nCountrySelectModule', () => {
  beforeEach(
    () => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [
          FormsModule,
          I18nCountrySelectModule.forRoot()
        ]
      });
    });
  
  it('should update select: model -> view', fakeAsync(() => {
    const fixture = TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<i18n-country-select [(iso3166Alpha2)]="model" size="sm"></i18n-country-select>`
      }
    }).createComponent(TestComponent);
    fixture.detectChanges();
    
    const comp = fixture.componentInstance;
    const select = fixture.debugElement.query(By.css('select'));
    
    let debugIdx = Math.floor(Math.random() * select.componentInstance.myCountries.length);
    const debugCountry = select.componentInstance.myCountries[debugIdx].value;
    ++debugIdx;
    
    comp.model = debugCountry;
    fixture.detectChanges();
    tick();
    expect(select.nativeElement.value).toEqual(`${debugIdx}: ${debugCountry}`);
  }));
  
  it('should update select: view -> model', fakeAsync(() => {
    const fixture = TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<i18n-country-select [(iso3166Alpha2)]="model" size="sm"></i18n-country-select>`
      }
    }).createComponent(TestComponent);
    fixture.detectChanges();
    
    const comp = fixture.componentInstance;
    const options = fixture.debugElement.queryAll(By.css('option'));
    const debugIdx = Math.floor(Math.random() * options.length);
    const event = document.createEvent('Event');
    
    event.initEvent('change', true, true);
    options[debugIdx].nativeElement.dispatchEvent(event);
    
    fixture.detectChanges();
    tick();
    expect(`${debugIdx}: ${comp.model}`).toEqual(options[debugIdx].nativeElement.value);
  }));
});


