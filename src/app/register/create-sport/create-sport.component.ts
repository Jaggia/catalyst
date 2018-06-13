import {Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegisterAuthService} from '../../services/register-auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-sport',
  templateUrl: './create-sport.component.html',
  styleUrls: ['./create-sport.component.css'],
  providers: []
})

export class CreateSportComponent implements OnInit {
  @Input() radioORcheck : string;

  sportMessage: any;
  sportValid: boolean;

  form: FormGroup;
  message;
  messageClass;
  processing = false;


  constructor(
    private formBuilder: FormBuilder,
    private authService: RegisterAuthService,
    private router: Router
  ) {
    this.createForm(); // Create Angular 2 Form when component loads
  }

  // Function to create registration form
  createForm() {
    this.form = this.formBuilder.group({
      // Sport Input
      sport: [''],
      baseball: [false],
      football: [false]
    }, { validator: null}); // Add custom validator to form for matching passwords

  }

  // Function to disable the registration form
  disableForm() {
    this.form.controls['sport'].disable();
  }

  // Function to enable the registration form
  enableForm() {
    this.form.controls['sport'].enable();
  }

  ngOnInit() {
  }

  changeValue(sportName) {
    const boolVal = this.form.controls[sportName].value;
    this.form.controls[sportName].setValue(!boolVal);
    // console.log($( "#baseball" ).is(':checked'));
    // console.log(!boolVal);
  }

}
