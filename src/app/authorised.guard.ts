import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

/**
 * Checks if there is a logged in user, and if there is no navigates to register page.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthorisedGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.user.value ? true : this.router.parseUrl('/login');
  }
}
