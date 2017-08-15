# ngx-i18n-country-select

## Angular4 Bootstrap4 i18n country select

Based on the wonderfull [i18n-iso-countries](https://github.com/michaelwittig/node-i18n-iso-countries) library. 

[![Build Status](https://travis-ci.org/osahner/ngx-i18n-country-select.svg?branch=master)](https://travis-ci.org/osahner/ngx-i18n-country-select)

#### Requires 

* **Bootstrap 4** `=v6`
* **i18n-iso-countries** `^1.15.1`

### Installation

To install this library, run:

```bash
$ npm install ngx-i18n-country-select --save
```

### Example

```typescript
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

```xml
<i18n-country-select [(iso3166Alpha2)]="item.isocode" size="sm"></i18n-country-select>
```

### Attributes

* **size**: `sm`, `lg` or nothing
* **iso3166Alpha2**: model as [ISO 3166-1 Aplpha2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)


### License

MIT © [Oliver Sahner](mailto:osahner@gmail.com)
