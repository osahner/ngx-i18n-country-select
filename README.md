# ngx-i18n-country-select

## A i18n country select widget

Angular wrapper for [i18n-iso-countries](https://github.com/michaelwittig/node-i18n-iso-countries).

[![Build Status](https://travis-ci.org/osahner/ngx-i18n-country-select.svg?branch=master)](https://travis-ci.org/osahner/ngx-i18n-country-select)

#### Requires

* **Angular** `^7`
* **Bootstrap** `^4.1`
* **i18n-iso-countries** `^3.7`

### Installation

To install this library, run:

```bash
npm install 18n-iso-countries --save
npm install ngx-i18n-country-select --save
```

### Example

```ts
// app.module.ts
import { NgModule, LOCALE_ID, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { I18nCountrySelectModule, I18nCountrySelectService } from 'ngx-i18n-country-select';

export function setUpI18nCountrySelect(service: I18nCountrySelectService) {
  return () => service.use(['de', 'en']);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    I18nCountrySelectModule.forRoot()
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'de-DE' },
    I18nCountrySelectService,
    {
      provide: APP_INITIALIZER,
      useFactory: setUpI18nCountrySelect,
      deps: [I18nCountrySelectService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

```ts
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  item = {
    isocode: 'de'
  };
}
```

```html
// app.component.html
<i18n-country-select [(iso3166Alpha2)]="item.isocode" size="sm"></i18n-country-select>
```

### Attributes

* **size**: `sm`, `lg` or nothing
* **iso3166Alpha2**: model as [ISO 3166-1 Alpha2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)


### Changelog

* v2.0.0 switchted to @angular/cli and ng-packagr, requires @angular/core v7 and i18n-iso-countries v3.7

### LICENCE

MIT © [Oliver Sahner](mailto:osahner@gmail.com)
