import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../auth.service';

/**
 * Checks if there is a logged in user, and if there is no navigates to register page.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthorisedGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean | UrlTree> {
    const user = await firstValueFrom(this.authService.loadCurrentUser());
    return user ? true : this.router.parseUrl('/login');
  }
}
