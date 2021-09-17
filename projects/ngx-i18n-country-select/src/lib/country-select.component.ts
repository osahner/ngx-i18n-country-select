import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { I18nCountrySelectService, IOption } from './i18n-country-select.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'country-select',
  template: ` <select
    [name]="name"
    [id]="name"
    [class]="cssClass"
    [ngModel]="value"
    (ngModelChange)="change($event)"
    [disabled]="disabled"
    [attr.readonly]="readonly"
    [attr.aria-readonly]="readonly"
  >
    <option [value]="null" disabled>{{ pleaseChoose }}</option>
    <option *ngFor="let country of items" [value]="country.value">{{ country.display }}</option>
  </select>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CountrySelectComponent,
    },
  ],
})
export class CountrySelectComponent implements ControlValueAccessor {
  @Input() name: string;

  @Input() cssClass: string;

  @Input() value: string;

  @Input() public pleaseChoose = 'Please choose...';

  @Input() public readonly = false;

  @Input() public disabled = false;

  public items: IOption[] = [];

  onChange = (value) => {};

  onTouched = () => {};

  touched = false;

  constructor(private service: I18nCountrySelectService) {
    this.items = this.service.loadCountries();
  }

  change($event?: string) {
    this.value = $event;
    this.markAsTouched();
    this.onChange(this.value);
  }

  onAdd() {
    this.markAsTouched();
    if (!this.disabled) {
      this.onChange(this.value);
    }
  }

  onRemove() {
    this.markAsTouched();
    if (!this.disabled) {
      this.onChange(this.value);
    }
  }

  writeValue(value: string) {
    this.value = value;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
}
