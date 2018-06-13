import {Component, OnInit, ViewChild} from '@angular/core';
import {SportAuthService} from '../../services/sport-auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FootballSchemaComponent} from '../football-schema/football-schema.component';
import {BaseballSchemaComponent} from '../baseball-schema/baseball-schema.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-recruit',
  templateUrl: './add-recruit.component.html',
  styleUrls: ['./add-recruit.component.css']
})
export class AddRecruitComponent implements OnInit {
  message;
  messageClass;
  recruits;
  form : FormGroup;
  sportsList;
  formVisible = false;
  private processing: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private sportService: SportAuthService,
    private router: Router
  ) {
    this.createForm();
  }

  @ViewChild(BaseballSchemaComponent)
  private createBaseballSchemaComponent: BaseballSchemaComponent;
  @ViewChild(FootballSchemaComponent)
  private createFootballSchemaComponent: FootballSchemaComponent;

  ngOnInit() {
    this.getSports();
    this.getRecruits();
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

  makeVisible() {
    this.formVisible = !this.formVisible;
  }

  getRecruits() {
    this.sportService.getRecruits().subscribe(data => {
      // Check if success true or success false was returned from API
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set an error class
        this.message = data.message; // Set an error message
        // this.processing = false; // Re-enable submit button
      } else {
        this.recruits = data.recruitList;
        console.log("Got Recruits");
      }
    });
  }

  getSports() {
    this.sportService.getSports().subscribe(data => {
      // Check if success true or success false was returned from API
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set an error class
        this.message = data.message; // Set an error message
        // this.processing = false; // Re-enable submit button
      } else {
        this.sportsList = data.sportList;
        console.log("Got Sports");
      }
    });
  }

  onRecruitCreateSubmit() {
    this.processing = true; // Used to notify HTML that form is in processing, so that it can be disabled
    this.disableForm(); // Disable the form
    if (this.sportsList.sport.baseball) {
      let baseballSchema = {
        pitchSpeed: this.createBaseballSchemaComponent.form.get('pitchSpeed').value
      };
      this.sportService.createBaseballSchema(baseballSchema).subscribe(data => {
        if (data.success) {
          this.messageClass = 'alert alert-success'; // Set a success class
          this.message = data.message; // Set a success messagers
          const recruit = {
            firstname: this.form.get('firstname').value, // E-mail input field
            lastname: this.form.get('lastname').value, // E-mail input field
            baseballStat: data.baseballSchemaID,
            organization: data.organID
          };
          this.sportService.createRecruit(recruit).subscribe(data => {
            if (data.success) {
              this.messageClass = 'alert alert-success'; // Set a success class
              this.message = data.message; // Set a success messagers
            } else {
              this.messageClass = 'alert alert-danger'; // Set an error class
              this.message = data.message; // Set an error message
              this.processing = false; // Re-enable submit button
              this.enableForm(); // Re-enable form
            }
          })
        } else {
          this.messageClass = 'alert alert-danger'; // Set an error class
          this.message = data.message; // Set an error message
          this.processing = false; // Re-enable submit button
          this.enableForm(); // Re-enable form
        } //data success end if
      });
    } else {
      if (this.sportsList.sport.football) {
        let footballSchema = {
          pitchSpeed: this.createBaseballSchemaComponent.form.get('fortyDash').value
        };
        this.sportService.createFootballSchema(footballSchema).subscribe(data => {
          if (data.success) {
            this.messageClass = 'alert alert-success'; // Set a success class
            this.message = data.message; // Set a success messagers
            const recruit = {
              firstname: this.form.get('firstname').value, // E-mail input field
              lastname: this.form.get('lastname').value, // E-mail input field
              footballStat: data.footballSchemaID,
              organization: data.organID
            };
            this.sportService.createRecruit(recruit).subscribe(data => {
              if (data.success) {
                this.messageClass = 'alert alert-success'; // Set a success class
                this.message = data.message; // Set a success messagers
                console.log("a;lsdkjf")
              } else {
                this.messageClass = 'alert alert-danger'; // Set an error class
                this.message = data.message; // Set an error message
                this.processing = false; // Re-enable submit button
                this.enableForm(); // Re-enable form
              }
            })
          } else {
            this.messageClass = 'alert alert-danger'; // Set an error class
            this.message = data.message; // Set an error message
            this.processing = false; // Re-enable submit button
            this.enableForm(); // Re-enable form
          } //data success end if
        });
      }
    }
    setTimeout(() => {
       window.location.reload(true);// Redirect to login view
    }, 1000);
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
