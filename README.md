# ngx-i18n-country-select

## Angular4 Bootstrap4 i18n country select

Based on the wonderfull [i18n-iso-countries](https://github.com/michaelwittig/node-i18n-iso-countries) library. 

#### Requires 

* **Bootstrap 4** `=v6`
* **i18n-iso-countries** `^1.15.1`

## Installation

To install this library, run:

```bash
$ npm install ngx-i18n-country-select --save
```

## Consuming your library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
$ npm install ngx-i18n-country-select
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { I18nCountrySelectModule } from 'ngx-i18n-country-select';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // Specify your library as an import
    I18nCountrySelectModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, you can use its components, directives and pipes in your Angular application:

```xml
<!-- You can now use your library component in app.component.html -->
<h1>
  {{title}}
</h1>
<i18n-country-select [(iso3166Alpha2)]="item.isocode" size="sm"></i18n-country-select>
```

### Attributes

* **size**: `sm`, `lg` or nothing
* **iso3166Alpha2**: model as [ISO 3166-1 Aplpha2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)


### License

MIT © [Oliver Sahner](mailto:osahner@gmail.com)
