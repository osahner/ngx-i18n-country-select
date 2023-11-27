import { Component, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from '@angular/forms';
import { I18nCountrySelectService, IOption } from './i18n-country-select.service';
import { NgFor } from '@angular/common';

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
    <option
      *ngFor="let country of items"
      [value]="country.value"
      [attr.disabled]="country.value ? null : disableEmptyValue"
    >
      {{ country.display }}
    </option>
  </select>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CountrySelectComponent,
    },
  ],
  standalone: true,
  imports: [FormsModule, NgFor],
})
export class CountrySelectComponent implements ControlValueAccessor, OnInit {
  @Input() locale?: string = 'de';

  @Input() name?: string;

  @Input() cssClass?: string;

  @Input() value?: string;

  @Input() pleaseChoose = 'Please choose...';
  @Input() pleaseChooseEnabled = false;

  @Input() readonly = false;

  @Input() disabled = false;

  @Input() disableEmptyValue = false;

  @Input() additionalItems: IOption[] | undefined;

  @Input() onlyThisItems: string[] | undefined;

  @Input() renameItemsDisplay: IOption[] | undefined;

  items: IOption[] = [];

  onChange = (value: unknown) => {};

  onTouched = () => {};

  touched = false;

  constructor(private service: I18nCountrySelectService) {}

  ngOnInit(): void {
    this.items = this.service.loadCountries(this.locale);

    if (this.renameItemsDisplay) {
      let dirty = false;
      this.renameItemsDisplay.forEach((item) => {
        const i = this.items.findIndex((orig) => orig.value === item.value);
        if (i > -1) {
          this.items[i].display = item.display;
          dirty = true;
        }
      });
      if (dirty) {
        this.items = this.items.sort((a: IOption, b: IOption) =>
          a.display.localeCompare(b.display)
        );
      }
    }
    if (this.onlyThisItems) {
      const filtered = this.items.filter(
        (i) => i.value && this.onlyThisItems!!.lastIndexOf(i.value) > -1
      );
      this.items = filtered;
    }

    if (this.additionalItems) {
      // first remove all items that are in the additional list
      this.additionalItems.forEach((item) => {
        const i = this.items.findIndex((orig) => orig.value === item.value);
        if (i > -1) {
          const result = this.items.splice(i, 1);
        }
      });
      // then add the additional items to the beginning of the list
      this.items = [...this.additionalItems, ...this.items];
    }
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
