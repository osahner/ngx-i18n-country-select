import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy
} from '@angular/core';
import { IOption, I18nCountrySelectService } from './ngx-i18n-country-select.service';

@Component({
  selector: 'i18n-country-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <select
      name="theme"
      [class]="'form-control' + (size ? ' form-control-' + size : '')"
      [ngModel]="iso3166Alpha2"
      (ngModelChange)="change($event)"
      [disabled]="!editable"
    >
      <option [ngValue]="null">{{ defaultLabel }}</option>
      <option *ngFor="let country of items" [ngValue]="country.value">{{ country.display }}</option>
    </select>
  `
})
export class I18nCountrySelectComponent implements AfterViewChecked {
  public defaultLabel: string;

  @Input()
  public iso3166Alpha2: string;

  @Input()
  public size: 'sm' | 'lg';

  @Input()
  public pleaseChoose = 'Please choose...';

  @Input()
  public editable = true;

  @Output()
  public iso3166Alpha2Change = new EventEmitter();

  public items: IOption[] = [];

  constructor(private cdRef: ChangeDetectorRef, private service: I18nCountrySelectService) {
    this.items = this.service.loadCountries();
    this.defaultLabel = this.pleaseChoose;
  }

  public change(newValue: string): void {
    this.iso3166Alpha2 = newValue;
    this.iso3166Alpha2Change.emit(newValue);
  }

  ngAfterViewChecked() {
    if (this.iso3166Alpha2) {
      this.iso3166Alpha2 = this.iso3166Alpha2.toLowerCase();
    }
    this.cdRef.detectChanges(); // avoid ExpressionChangedAfterItHasBeenCheckedError
  }
}
