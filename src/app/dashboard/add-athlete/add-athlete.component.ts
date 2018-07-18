import {Component, OnInit, ViewChild} from '@angular/core';
import {SportAuthService} from '../../services/sport-auth.service';
import {FootballSchemaComponent} from '../football-schema/football-schema.component';
import {BaseballSchemaComponent} from '../baseball-schema/baseball-schema.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {browser} from 'protractor';
import {BasketballSchemaComponent} from '../basketball-schema/basketball-schema.component';
import {CreateOrganizationComponent} from '../../register/create-organization/create-organization.component';
import {RegisterAuthService} from '../../services/register-auth.service';

@Component({
  selector: 'app-add-athlete',
  templateUrl: './add-athlete.component.html',
  styleUrls: ['./add-athlete.component.css']
})
export class AddAthleteComponent implements OnInit {
  form: FormGroup;
  message;
  messageClass;
  athletes;
  sportsList;
  organizations;
  formVisible = false;
  private processing: boolean;

  @ViewChild(CreateOrganizationComponent)
  private createOrganizationComponent: CreateOrganizationComponent;

  constructor(
    private formBuilder: FormBuilder,
    private sportService: SportAuthService,
    private authService: RegisterAuthService,
    private router: Router
  ) {
    this.createForm();
  }

  @ViewChild(BasketballSchemaComponent)
  private createBasketballSchemaComponent: BasketballSchemaComponent;
  @ViewChild(BaseballSchemaComponent)
  private createBaseballSchemaComponent: BaseballSchemaComponent;
  @ViewChild(FootballSchemaComponent)
  private createFootballSchemaComponent: FootballSchemaComponent;

  ngOnInit() {
    // this.getSports();
      this.generateOrgans();
      this.getAthletes();
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
      ])],
      number: ['', ([//Validators.compose([
        //Validators.required, // Field is required
        //this.validateUsername // Custom validation
        //todo add custom number validation
      ])],
      organization : ['', Validators.required]
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

  getAthletes() {
    this.sportService.getAthletes().subscribe(data => {
      // Check if success true or success false was returned from API
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set an error class
        this.message = data.message; // Set an error message
        // this.processing = false; // Re-enable submit button
      } else {
        this.athletes = data.athleteList;
        // console.log(this.athletes)
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
      }
    });
  }

  onAthleteCreateSubmit() {
      this.processing = true; // Used to notify HTML that form is in processing, so that it can be disabled
      this.disableForm(); // Disable the form
      // Create user object form user's inputs
      if (this.form.get('organization').value === 'New') {
          const organName = (this.createOrganizationComponent.form.controls['organizationname'].value);
          const organLoc = (this.createOrganizationComponent.form.controls['location'].value);
          // const sportSchema = {
          //   baseball : this.createSportComponent.form.get('baseball').value,
          //   football : this.createSportComponent.form.get('football').value
          // };
          const organization = {
              organizationname : organName,
              location : organLoc
              // sport : sportSchema
          };
          this.authService.createOrganization(organization).subscribe(data => {
              if (data.success) {
                  this.messageClass = 'alert alert-success'; // Set a success class
                  this.message = data.message; // Set a success messagers
                  const organID = data.organizationID;

                  this.processing = true; // Used to notify HTML that form is in processing, so that it can be disabled
                  this.disableForm(); // Disable the form
                  // if (this.sportsList.sport.baseball) {
                  //   let baseballSchema = {
                  //     pitchSpeed : this.createBaseballSchemaComponent.form.get('pitchSpeed').value
                  //   };
                  //   this.sportService.createBaseballSchema(baseballSchema).subscribe(data => {
                  //     if (data.success) {
                  //       this.messageClass = 'alert alert-success'; // Set a success class
                  //       this.message = data.message; // Set a success messagers
                  //       const athlete = {
                  //         firstname: this.form.get('firstname').value, // E-mail input field
                  //         lastname: this.form.get('lastname').value, // E-mail input field
                  //         baseballStat :  data.baseballSchemaID,
                  //         organization : data.organID
                  //       };
                  //       this.sportService.createAthlete(athlete).subscribe( data => {
                  //         if (data.success) {
                  //           this.messageClass = 'alert alert-success'; // Set a success class
                  //           this.message = data.message; // Set a success messagers
                  //         } else {
                  //           this.messageClass = 'alert alert-danger'; // Set an error class
                  //           this.message = data.message; // Set an error message
                  //           this.processing = false; // Re-enable submit button
                  //           this.enableForm(); // Re-enable form
                  //         }
                  //       })
                  //     } else {
                  //       this.messageClass = 'alert alert-danger'; // Set an error class
                  //       this.message = data.message; // Set an error message
                  //       this.processing = false; // Re-enable submit button
                  //       this.enableForm(); // Re-enable form
                  //     } //data success end if
                  //   });
                  // } else {
                  //   if (this.sportsList.sport.football) {
                  //     let footballSchema = {
                  //       pitchSpeed : this.createBaseballSchemaComponent.form.get('fortyDash').value
                  //     };
                  //     this.sportService.createFootballSchema(footballSchema).subscribe(data => {
                  //       if (data.success) {
                  //         this.messageClass = 'alert alert-success'; // Set a success class
                  //         this.message = data.message; // Set a success messagers
                  //         const athlete = {
                  //           firstname: this.form.get('firstname').value, // E-mail input field
                  //           lastname: this.form.get('lastname').value, // E-mail input field
                  //           footballStat :  data.footballSchemaID,
                  //           organization : data.organID
                  //         };
                  //         this.sportService.createAthlete(athlete).subscribe( data => {
                  //           if (data.success) {
                  //             this.messageClass = 'alert alert-success'; // Set a success class
                  //             this.message = data.message; // Set a success messagers
                  //           } else {
                  //             this.messageClass = 'alert alert-danger'; // Set an error class
                  //             this.message = data.message; // Set an error message
                  //             this.processing = false; // Re-enable submit button
                  //             this.enableForm(); // Re-enable form
                  //           }
                  //         })
                  //       } else {
                  //         this.messageClass = 'alert alert-danger'; // Set an error class
                  //         this.message = data.message; // Set an error message
                  //         this.processing = false; // Re-enable submit button
                  //         this.enableForm(); // Re-enable form
                  //       } //data success end if
                  //     });
                  //   }
                  // }
                  const basketballSchema = {
                      // PTA2 : this.createBasketballSchemaComponent.form.get('PTA2').value
                      PTA2 : 0
                  };
                  this.sportService.createBasketballSchema(basketballSchema).subscribe(data => {
                      if (data.success) {
                          this.messageClass = 'alert alert-success'; // Set a success class
                          this.message = data.message; // Set a success messagers
                          const athlete = {
                              firstname: this.form.get('firstname').value,
                              lastname: this.form.get('lastname').value,
                              number: this.form.get('number').value,
                              basketballStat :  data.basketballSchemaID,
                              organization : organID
                          };
                          this.sportService.createAthlete(athlete).subscribe( data => {
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
                  setTimeout(() => {
                      window.location.reload(true);// Redirect to login view
                  }, 1000);

              } else {
                  if (!data.success) {
                      this.messageClass = 'alert alert-danger'; // Set an error class
                      this.message = data.message; // Set an error message
                      this.processing = false; // Re-enable submit button
                      this.enableForm(); // Re-enable form
                  }
              }
          });
      } else {
          // Function from authentication service to register user
          this.processing = true; // Used to notify HTML that form is in processing, so that it can be disabled
          this.disableForm(); // Disable the form
          // if (this.sportsList.sport.baseball) {
          //   let baseballSchema = {
          //     pitchSpeed : this.createBaseballSchemaComponent.form.get('pitchSpeed').value
          //   };
          //   this.sportService.createBaseballSchema(baseballSchema).subscribe(data => {
          //     if (data.success) {
          //       this.messageClass = 'alert alert-success'; // Set a success class
          //       this.message = data.message; // Set a success messagers
          //       const athlete = {
          //         firstname: this.form.get('firstname').value, // E-mail input field
          //         lastname: this.form.get('lastname').value, // E-mail input field
          //         baseballStat :  data.baseballSchemaID,
          //         organization : data.organID
          //       };
          //       this.sportService.createAthlete(athlete).subscribe( data => {
          //         if (data.success) {
          //           this.messageClass = 'alert alert-success'; // Set a success class
          //           this.message = data.message; // Set a success messagers
          //         } else {
          //           this.messageClass = 'alert alert-danger'; // Set an error class
          //           this.message = data.message; // Set an error message
          //           this.processing = false; // Re-enable submit button
          //           this.enableForm(); // Re-enable form
          //         }
          //       })
          //     } else {
          //       this.messageClass = 'alert alert-danger'; // Set an error class
          //       this.message = data.message; // Set an error message
          //       this.processing = false; // Re-enable submit button
          //       this.enableForm(); // Re-enable form
          //     } //data success end if
          //   });
          // } else {
          //   if (this.sportsList.sport.football) {
          //     let footballSchema = {
          //       pitchSpeed : this.createBaseballSchemaComponent.form.get('fortyDash').value
          //     };
          //     this.sportService.createFootballSchema(footballSchema).subscribe(data => {
          //       if (data.success) {
          //         this.messageClass = 'alert alert-success'; // Set a success class
          //         this.message = data.message; // Set a success messagers
          //         const athlete = {
          //           firstname: this.form.get('firstname').value, // E-mail input field
          //           lastname: this.form.get('lastname').value, // E-mail input field
          //           footballStat :  data.footballSchemaID,
          //           organization : data.organID
          //         };
          //         this.sportService.createAthlete(athlete).subscribe( data => {
          //           if (data.success) {
          //             this.messageClass = 'alert alert-success'; // Set a success class
          //             this.message = data.message; // Set a success messagers
          //           } else {
          //             this.messageClass = 'alert alert-danger'; // Set an error class
          //             this.message = data.message; // Set an error message
          //             this.processing = false; // Re-enable submit button
          //             this.enableForm(); // Re-enable form
          //           }
          //         })
          //       } else {
          //         this.messageClass = 'alert alert-danger'; // Set an error class
          //         this.message = data.message; // Set an error message
          //         this.processing = false; // Re-enable submit button
          //         this.enableForm(); // Re-enable form
          //       } //data success end if
          //     });
          //   }
          // }
          const basketballSchema = {
              // PTA2 : this.createBasketballSchemaComponent.form.get('PTA2').value
              PTA2 : 0
          };
          this.sportService.createBasketballSchema(basketballSchema).subscribe(data => {
              if (data.success) {
                  this.messageClass = 'alert alert-success'; // Set a success class
                  this.message = data.message; // Set a success messagers
                  const athlete = {
                      firstname: this.form.get('firstname').value,
                      lastname: this.form.get('lastname').value,
                      number: this.form.get('number').value,
                      basketballStat :  data.basketballSchemaID,
                      organization : data.organID
                  };
                  this.sportService.createAthlete(athlete).subscribe( data => {
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
          setTimeout(() => {
              window.location.reload(true);// Redirect to login view
          }, 1000);
      }

  }

  // onAthleteCreateSubmit() {
  //   this.processing = true; // Used to notify HTML that form is in processing, so that it can be disabled
  //   this.disableForm(); // Disable the form
  //   // if (this.sportsList.sport.baseball) {
  //   //   let baseballSchema = {
  //   //     pitchSpeed : this.createBaseballSchemaComponent.form.get('pitchSpeed').value
  //   //   };
  //   //   this.sportService.createBaseballSchema(baseballSchema).subscribe(data => {
  //   //     if (data.success) {
  //   //       this.messageClass = 'alert alert-success'; // Set a success class
  //   //       this.message = data.message; // Set a success messagers
  //   //       const athlete = {
  //   //         firstname: this.form.get('firstname').value, // E-mail input field
  //   //         lastname: this.form.get('lastname').value, // E-mail input field
  //   //         baseballStat :  data.baseballSchemaID,
  //   //         organization : data.organID
  //   //       };
  //   //       this.sportService.createAthlete(athlete).subscribe( data => {
  //   //         if (data.success) {
  //   //           this.messageClass = 'alert alert-success'; // Set a success class
  //   //           this.message = data.message; // Set a success messagers
  //   //         } else {
  //   //           this.messageClass = 'alert alert-danger'; // Set an error class
  //   //           this.message = data.message; // Set an error message
  //   //           this.processing = false; // Re-enable submit button
  //   //           this.enableForm(); // Re-enable form
  //   //         }
  //   //       })
  //   //     } else {
  //   //       this.messageClass = 'alert alert-danger'; // Set an error class
  //   //       this.message = data.message; // Set an error message
  //   //       this.processing = false; // Re-enable submit button
  //   //       this.enableForm(); // Re-enable form
  //   //     } //data success end if
  //   //   });
  //   // } else {
  //   //   if (this.sportsList.sport.football) {
  //   //     let footballSchema = {
  //   //       pitchSpeed : this.createBaseballSchemaComponent.form.get('fortyDash').value
  //   //     };
  //   //     this.sportService.createFootballSchema(footballSchema).subscribe(data => {
  //   //       if (data.success) {
  //   //         this.messageClass = 'alert alert-success'; // Set a success class
  //   //         this.message = data.message; // Set a success messagers
  //   //         const athlete = {
  //   //           firstname: this.form.get('firstname').value, // E-mail input field
  //   //           lastname: this.form.get('lastname').value, // E-mail input field
  //   //           footballStat :  data.footballSchemaID,
  //   //           organization : data.organID
  //   //         };
  //   //         this.sportService.createAthlete(athlete).subscribe( data => {
  //   //           if (data.success) {
  //   //             this.messageClass = 'alert alert-success'; // Set a success class
  //   //             this.message = data.message; // Set a success messagers
  //   //           } else {
  //   //             this.messageClass = 'alert alert-danger'; // Set an error class
  //   //             this.message = data.message; // Set an error message
  //   //             this.processing = false; // Re-enable submit button
  //   //             this.enableForm(); // Re-enable form
  //   //           }
  //   //         })
  //   //       } else {
  //   //         this.messageClass = 'alert alert-danger'; // Set an error class
  //   //         this.message = data.message; // Set an error message
  //   //         this.processing = false; // Re-enable submit button
  //   //         this.enableForm(); // Re-enable form
  //   //       } //data success end if
  //   //     });
  //   //   }
  //   // }
  //   const basketballSchema = {
  //     // PTA2 : this.createBasketballSchemaComponent.form.get('PTA2').value
  //     PTA2 : 0
  //   };
  //   this.sportService.createBasketballSchema(basketballSchema).subscribe(data => {
  //     if (data.success) {
  //       this.messageClass = 'alert alert-success'; // Set a success class
  //       this.message = data.message; // Set a success messagers
  //       const athlete = {
  //         firstname: this.form.get('firstname').value,
  //         lastname: this.form.get('lastname').value,
  //         number: this.form.get('number').value,
  //         basketballStat :  data.basketballSchemaID,
  //         organization : data.organID
  //       };
  //       this.sportService.createAthlete(athlete).subscribe( data => {
  //         if (data.success) {
  //           this.messageClass = 'alert alert-success'; // Set a success class
  //           this.message = data.message; // Set a success messagers
  //         } else {
  //           this.messageClass = 'alert alert-danger'; // Set an error class
  //           this.message = data.message; // Set an error message
  //           this.processing = false; // Re-enable submit button
  //           this.enableForm(); // Re-enable form
  //         }
  //       })
  //     } else {
  //       this.messageClass = 'alert alert-danger'; // Set an error class
  //       this.message = data.message; // Set an error message
  //       this.processing = false; // Re-enable submit button
  //       this.enableForm(); // Re-enable form
  //     } //data success end if
  //   });
  //   setTimeout(() => {
  //     window.location.reload(true);// Redirect to login view
  //   }, 1000);
  // }

  onAthleteClick(_id, firstname, lastname) {
    this.router.navigate(['/dashboard' + '/' + firstname + lastname + '/' + _id]);
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

  generateOrgans() {
      this.authService.getOrganizations().subscribe(data => {
          // Check if success true or success false was returned from API
          if (!data.success) {
              this.messageClass = 'alert alert-danger'; // Set an error class
              this.message = data.message; // Set an error message
              // this.processing = false; // Re-enable submit button
          } else {
              this.organizations = data.organList;
          }
      });
  }
}
