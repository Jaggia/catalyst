import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterAuthService} from '../../services/register-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.css'],
  providers: []
})
export class CreateOrganizationComponent implements OnInit {
  organMessage: any;
  organValid: boolean;

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
      // First Name Input
      organizationname: ['', Validators.compose([
        Validators.required, // Field is required
        this.validateOrganization // Custom validation
      ])],
      location: ['', Validators.compose([
        Validators.required, // Field is required
        this.validateOrganization // Custom validation
      ])]
    }, { validator: null}); // Add custom validator to form for matching passwords

  }

  // Function to disable the registration form
  disableForm() {
    this.form.controls['organizationname'].disable();
    this.form.controls['location'].disable();
  }

  // Function to enable the registration form
  enableForm() {
    this.form.controls['organizationname'].enable();
    this.form.controls['location'].enable();
  }


  // Function to validate username is proper format
  validateOrganization(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^[\w\-\s]+$/);
    // Test username against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid username
    } else {
      return { 'validateOrganization': true } // Return as invalid username
    }
  }

  checkOrganization() {
    // Function from authentication file to check if username is taken
    this.authService.checkOrganization(this.form.get('organizationname').value).subscribe(data => {
      // Check if success true or success false was returned from API
      if (!data.success) {
        this.organValid = false; // Return username as invalid
        this.organMessage = data.message; // Return error message
      } else {
        this.organValid = true; // Return username as valid
        this.organMessage = data.message; // Return success message
      }
    });
  }


  ngOnInit() {
  }

}
