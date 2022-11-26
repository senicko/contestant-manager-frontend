import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, lastValueFrom, map } from 'rxjs';
import { AuthService } from './auth.service';

/**
 * Checks if there is a logged user, if there is redirects to root page.
 */
@Injectable({
  providedIn: 'root',
})
export class UnauthorisedGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.loadCurrentUser().pipe(
      map((user) => {
        return user ? this.router.parseUrl('/') : true;
      })
    );
  }
}
