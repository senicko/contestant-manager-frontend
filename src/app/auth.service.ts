import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';

export type User = {
  id: number;
  name: string;
  email: string;
};

export type UserRegisterData = {
  password: string;
} & Omit<User, 'id'>;

export type UserLoginData = Omit<User, 'id'>;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Registers the new user.
   * @param data created user credentials
   * @returns created user
   */
  register(data: UserRegisterData) {
    return this.http
      .post<User>('http://localhost:3000/register', data, {
        withCredentials: true,
      })
      .pipe(tap((user) => this.user.next(user)));
  }

  /**
   * Logins user to his account.
   * @param data user credentials
   */
  login(data: UserLoginData) {
    return this.http
      .post<User>('http://localhost:3000/login', data, {
        withCredentials: true,
      })
      .pipe(
        tap((user) => this.user.next(user)),
        catchError(() => {
          this.user.next(null);
          return of(this.user.value);
        })
      );
  }

  /**
   * Loads current user saved in session cookie.
   */
  loadCurrentUser() {
    return this.http
      .get<User>('http://localhost:3000/me', {
        withCredentials: true,
      })
      .pipe(
        tap((user) => this.user.next(user)),
        catchError(() => {
          this.user.next(null);
          return of(this.user.value);
        })
      );
  }
}
