import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { I18nCountrySelectService, IOption } from './i18n-country-select.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'country-select',
  template: ` <select
    [name]="name ?? ''"
    [id]="name"
    [class]="cssClass"
    [ngModel]="value"
    (ngModelChange)="change($event)"
    [disabled]="disabled"
    [attr.readonly]="readonly"
    [attr.aria-readonly]="readonly"
  >
    <option [value]="null" [attr.disabled]="pleaseChooseEnabled ? null : true">
      {{ pleaseChoose }}
    </option>
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
  @Input() name?: string;

  @Input() cssClass?: string;

  @Input() value?: string;

  @Input() public pleaseChoose = 'Please choose...';
  @Input() public pleaseChooseEnabled = false;

  @Input() public readonly = false;

  @Input() public disabled = false;

  @Input() public set additionalItems(items: IOption[]) {
    this.items = [...items, ...this.items];
  }

  @Input() public set onlyThisItems(items: string[]) {
    const filtered = this.items.filter((i) => items.lastIndexOf(i.value) > -1);
    this.items = filtered;
  }

  @Input() public set renameItemsDisplay(items: IOption[]) {
    let dirty = false;
    items.forEach((item) => {
      const i = this.items.findIndex((orig) => orig.value === item.value);
      if (i > -1) {
        this.items[i].display = item.display;
        dirty = true;
      }
    });
    if (dirty) {
      this.items = this.items.sort((a: IOption, b: IOption) => a.display.localeCompare(b.display));
    }
  }

  public items: IOption[] = [];

  onChange = (value: unknown) => {};

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
