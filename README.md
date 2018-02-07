# ngx-i18n-country-select

## A i18n country select widget

Based on the wonderfull [i18n-iso-countries](https://github.com/michaelwittig/node-i18n-iso-countries) library. 

[![Build Status](https://travis-ci.org/osahner/ngx-i18n-country-select.svg?branch=master)](https://travis-ci.org/osahner/ngx-i18n-country-select)

#### Requires 

* **Angular** `^^5.0.5`
* **Bootstrap** `^4.0.0`
* **i18n-iso-countries** `^2.1.0`

### Installation

To install this library, run:

```bash
npm install 18n-iso-countries@^2.1.0  --save
npm install ngx-i18n-country-select --save
```

### Example

```ts
// app.module.ts
...
import { I18nCountrySelectModule } from 'ngx-i18n-country-select';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    I18nCountrySelectModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

```html
<i18n-country-select [(iso3166Alpha2)]="item.isocode" size="sm"></i18n-country-select>
```

### Attributes

* **size**: `sm`, `lg` or nothing
* **iso3166Alpha2**: model as [ISO 3166-1 Alpha2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)


### License

MIT
