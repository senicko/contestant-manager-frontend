import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../auth.service';

/**
 * Checks if there is a logged user, if there is redirects to root page.
 */
@Injectable({
  providedIn: 'root',
})
export class UnauthorisedGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean | UrlTree> {
    const user = await firstValueFrom(this.authService.loadCurrentUser());
    return user ? this.router.parseUrl('/dashboard') : true;
  }
}
