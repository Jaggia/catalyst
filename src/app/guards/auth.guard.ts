import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { RegisterAuthService} from '../services/register-auth.service'

@Injectable()
export class AuthGuard implements CanActivate {

  redirectUrl;

  constructor(
    private authService: RegisterAuthService,
    private router: Router
  ) { }

  // Function to check if user is authorized to view route
  canActivate(
    router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    // Check if user is logged in
    if (this.authService.loggedIn()) {
      return true; // Return true: User is allowed to view route
    } else {
      this.redirectUrl = state.url; // Grab previous url
      this.router.navigate(['']); // Return error and route to login page
      return false; // Return false: user not authorized to view page
    }
  }
}