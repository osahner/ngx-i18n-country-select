/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { I18nCountrySelectModule }  from '../dist';

@Component({
  selector: 'app',
  template: `<i18n-country-select></i18n-country-select>`
})
class AppComponent {}

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ],
  imports: [ BrowserModule, I18nCountrySelectModule ]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
