# ngx-i18n-country-select

## Angular4 Bootstrap4 i18n country select

Based on the wonderfull [i18n-iso-countries](https://github.com/michaelwittig/node-i18n-iso-countries) library. 

#### Requires 

* **Angular 2** `^=4.0.3`
* **Bootstrap 4** `=v6`
* **i18n-iso-countries** `^=1.11.0`


### Installation

```
$ npm install https://github.com/osahner/ngx-i18n-country-select.git --save
```

### Example

```ts
// app.module.ts
import { I18nCountrySelectModule } from 'ngx-i18n-country-select';
...
@NgModule({
  ...
  imports: [
    I18nCountrySelectModule,
    ...
  ],
  ...
})
```

```html
<i18n-country-select [(iso3166Alpha2)]="item.isocode" size="sm"></i18n-country-select>
```

### Attributes

* **size**: `sm`, `lg` or nothing
* **iso3166Alpha2**: model as [ISO 3166-1 Aplpha2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)

### LICENCE

MIT
