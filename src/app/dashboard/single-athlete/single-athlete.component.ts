import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as $ from 'jquery';
import { RegisterAuthService} from '../../services/register-auth.service';
import {SportAuthService} from '../../services/sport-auth.service';
import {BasketballSchemaComponent} from '../basketball-schema/basketball-schema.component';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-single-athlete',
  templateUrl: './single-athlete.component.html',
  styleUrls: ['./single-athlete.component.css']
})
export class SingleAthleteComponent implements OnInit {
  message;
  messageClass;
  firstname = '';
  lastname = '';
  id = '';
  bball_id = '';
  bball_schema;
  bball_schema_props;
  bball_schema_vals;

  constructor(private route: ActivatedRoute,
              private authService: RegisterAuthService,
              private sportService: SportAuthService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.sportService.getAthlete(this.id).subscribe(data => {
      // Check if success true or success false was returned from API
        this.firstname = data.athlete.firstname;
        this.lastname = data.athlete.lastname;
        // console.log(this.id)
    });
    this.getAthlete()
    // this.getBasketballStat()
  }

  changeField() {
    // this.authService.getProfile().subscribe(data => {
      const newFirstname= $( "#newFirstname" ).val();
      const athlete = {
        newFirstname : newFirstname,
        identity: this.id
      };
      this.sportService.changeAthlete(athlete).subscribe(data => {
        if (data.success) {
          console.log(data);
          this.firstname = data.firstname;
        } else {
          console.log("no work");
          console.log(data);
        }
      });
  }

  getAthlete() {
    this.sportService.getAthlete(this.id).subscribe(data => {
      // Check if success true or success false was returned from API
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set an error class
        this.message = data.message; // Set an error message
        // this.processing = false; // Re-enable submit button
      } else {
        this.firstname = data.athlete.firstname;
        this.lastname = data.athlete.lastname;
        this.id = this.route.snapshot.params['id'];
        this.bball_id = data.athlete.basketballStat;
        // console.log(this.bball_id, "BBALL ID")
        this.getBasketballStat()
      }
    });
  }

  getBasketballStat() {
    this.sportService.getBasketballStat(this.bball_id).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set an error class
        this.message = data.message; // Set an error message
        // this.processing = false; // Re-enable submit button
      } else {
        // Step 1. Get all the object keys.
        this.bball_schema = data.basketballSchema;
        let evilResponseProps = Object.keys(this.bball_schema);
        // Step 2. Create an empty array.
        let goodResponseProps = [];
        let goodResponseVals = [];
        // Step 3. Iterate throw all keys.
        for(let prop in evilResponseProps) {
          goodResponseProps.push(evilResponseProps[prop]);
        }
        this.bball_schema_props = goodResponseProps.slice(1, goodResponseProps.length - 1)
        for (let i = 0; i < this.bball_schema_props.length; i++) {
          goodResponseVals.push(this.bball_schema[this.bball_schema_props[i]])
        }
        this.bball_schema_vals = goodResponseVals
      }
    });
  }

  changeBasketBall() {
    var basketBall = {
      // number : $("#").val(),
      PTA2 : $("#PTA2").val(),
      PTM2 : $("#PTM2").val(),
      PTA3 : $("#PTA3").val(),
      AST : $("#AST").val(),
      BLK : $("#BLK").val(),
      DRB : $("#DRB").val(),
      FTA : $("#FTA").val(),
      FTM : $("#FTM").val(),
      ORB : $("#ORB").val(),
      PF : $("#PF").val(),
      STL : $("#STL").val(),
      TO : $("#TO").val(),
      ASTPG : $("#ASTPG").val(),
      STLPG : $("#STLPG").val(),
      PTP2 : $("#PTP2").val(),
      PTP3 : $("#PTP3").val(),
      AST_TO_RATIO : $("#AST_TO_RATIO").val(),
      BLKPG : $("#BLKPG").val(),
      FGP : $("#FGP").val(),
      FGA : $("#FGA").val(),
      FGM : $("#FGM").val(),
      FTP : $("#FTP").val(),
      GP : $("#GP").val(),
      MINPG : $("#MINPG").val(),
      OPP : $("#OPP").val(),
      OPPG : $("#OPPG").val(),
      PFPG : $("#PFPG").val(),
      PPG : $("#PPG").val(),
      RPG : $("#RPG").val(),
      TOPG : $("#TOPG").val(),
      MIN : $("#MIN").val(),
      PTS : $("#PTS").val(),
      TRB : $("#TRB").val(),
      FF : $("#FF").val(),
      TECHF : $("#TECHF").val(),
      DQ : $("#DQ").val(),
      GS : $("#GS").val(),
      TF : $("#TF").val(),
      W : $("#W").val(),
      L : $("#L").val(),
      T : $("#T").val(),
      identity: this.bball_id
    };

    for (let i = 0; i < this.bball_schema_props.length; i++) {
      if(basketBall[this.bball_schema_props[i]] != this.bball_schema[this.bball_schema_props[i]]
          && basketBall[this.bball_schema_props[i]].length != 0){
        this.bball_schema[this.bball_schema_props[i]] = basketBall[this.bball_schema_props[i]]
      }
      if(basketBall[this.bball_schema_props[i]] == null || basketBall[this.bball_schema_props[i]].length == 0) {
        basketBall[this.bball_schema_props[i]] = this.bball_schema[this.bball_schema_props[i]]
      }
      // alert(basketBall[this.bball_schema_props[i]] + ", " + this.bball_schema[this.bball_schema_props[i]])
    }

    this.sportService.changeBasketballSchema(basketBall).subscribe(data => {
      if (data.success) {
        console.log(data);
        // this.firstname = data.firstname;
      } else {
        console.log("no work");
        console.log(data);
      }
    });
    this.getBasketballStat();
  }

}
