import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ngx-i18n-country-select-tester';
  form1: UntypedFormGroup;
  form2: UntypedFormGroup;

  constructor(private builder: UntypedFormBuilder) {
    this.form1 = this.builder.group({
      country: ['de'],
    });
    this.form2 = this.builder.group({
      country: ['de'],
    });
  }
}
