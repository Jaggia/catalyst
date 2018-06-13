import { Component, OnInit } from '@angular/core';
import { RegisterAuthService} from '../services/register-auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService: RegisterAuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
  ) { }

  // Function to logout user
  onLogoutClick() {
    this.authService.logout(); // Logout user
    this.flashMessagesService.show('You are logged out', { cssClass: 'alert-info' }); // Set custom flash message
    this.router.navigate(['']); // Navigate back to home page
  }

  ngOnInit() {
  }

}
