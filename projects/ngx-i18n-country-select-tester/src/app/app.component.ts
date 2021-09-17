import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ngx-i18n-country-select-tester';
  item = {
    isocode: 'de',
  };
  form: FormGroup;

  constructor(private builder: FormBuilder) {
    this.form = this.builder.group({
      country: ['de'],
    });
  }
}
