import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ngx-i18n-country-select-tester';
  form1: FormGroup;
  form2: FormGroup;

  constructor(private builder: FormBuilder) {
    this.form1 = this.builder.group({
      country: ['de'],
    });
    this.form2 = this.builder.group({
      country: ['de'],
    });
  }
}
