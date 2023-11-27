import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountrySelectComponent } from '../../../ngx-i18n-country-select/src/public_api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CountrySelectComponent,
    ],
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
      country: ['en'],
    });
  }
}
