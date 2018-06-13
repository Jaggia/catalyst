import { Component, OnInit } from '@angular/core';
import {RegisterAuthService} from '../services/register-auth.service';
import {SportAuthService} from '../services/sport-auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  user: any;
  message: any;
  messageClass: string;
  users: any;
  listVisible : boolean;

  constructor(
    private authService: RegisterAuthService,
    private sportService: SportAuthService
  ) { this.listVisible = true;}

  ngOnInit() {
    this.getAllOrganizationUsers();
  }

  getAllOrganizationUsers() {
    this.authService.getAllOrganizationUsers().subscribe(data => {
      // Check if success true or success false was returned from API
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set an error class
        this.message = data.message; // Set an error message
      } else {
        this.users = data.userList;
        console.log(this.users)
      }
    });
  }

  getUser(id) {
    this.listVisible = false;
    this.sportService.getUser(id).subscribe(data => {
      // Check if success true or success false was returned from API
      this.user = data.user;
      console.log(this.user)
    });
  }

  goBack() {
    this.listVisible = true;
  }

}
