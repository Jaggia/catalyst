import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-baseball-schema',
  templateUrl: './baseball-schema.component.html',
  styleUrls: ['./baseball-schema.component.css']
})
export class BaseballSchemaComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.createForm(); // Create Angular 2 Form when component loads
  }

  createForm() {
    this.form = this.formBuilder.group({
      // First Name Input
      pitchSpeed: ['', ([//Validators.compose([
        //Validators.required, // Field is required
        //this.validateUsername // Custom validation
        //todo add custom number validation
      ])]
    }, {validator : null});

  }

  ngOnInit() {
  }

  validate(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode( key );
    var regex = /[0-9]|\./;
    if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }
  }

}
