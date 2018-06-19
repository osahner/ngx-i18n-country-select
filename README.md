# ngx-i18n-country-select

## A i18n country select widget

Based on the wonderfull [i18n-iso-countries](https://github.com/michaelwittig/node-i18n-iso-countries) library. 

[![Build Status](https://travis-ci.org/osahner/ngx-i18n-country-select.svg?branch=master)](https://travis-ci.org/osahner/ngx-i18n-country-select)

#### Requires 

* **Angular** `^5.2.0`
* **Bootstrap** `^4.0.0`
* **i18n-iso-countries** `^2.1.1`

### Installation

To install this library, run:

```console
npm install i18n-iso-countries@^2.1.0  --save
npm install ngx-i18n-country-select --save
```

### Example

```ts
// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { I18nCountrySelectModule } from 'ngx-i18n-country-select';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, I18nCountrySelectModule.forRoot()],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

```html
<!-- app.component.html -->
<i18n-country-select [(iso3166Alpha2)]="item.isocode" size="sm"></i18n-country-select>
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

### Attributes

* **size**: `sm`, `lg` or nothing
* **iso3166Alpha2**: model as [ISO 3166-1 Alpha2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)

### License

MIT
