import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  form: FormGroup;
  message;
  messageClass;
  sideBarContent;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.createForm(); // Create Angular 4 Form when component loads
    this.sideBarContent = 1;
  }

  sideBarContentChange(number) {
    this.sideBarContent = number;
  }

  createForm() {
    this.form = this.formBuilder.group({
      // First Name Input
      firstname: ['', Validators.compose([
        Validators.required, // Field is required
        this.validateUsername // Custom validation
      ])],
      // Last Name Input
      lastname: ['', Validators.compose([
        Validators.required, // Field is required
        this.validateUsername // Custom validation
      ])]
    }, { validator: null});
  }

  ngOnInit() {
  }

  // Function to validate username is proper format
  validateUsername(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    // Test username against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid username
    } else {
      return { 'validateUsername': true } // Return as invalid username
    }
  }

  // Function to disable the registration form
  disableForm() {
    this.form.controls['firstname'].disable();
    this.form.controls['lastname'].disable();
  }

  // Function to enable the registration form
  enableForm() {
    this.form.controls['firstname'].enable();
    this.form.controls['lastname'].enable();
  }

}
