import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, UserLoginData } from 'src/app/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  controls: string[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.controls = Object.keys(this.loginForm.controls);
  }

  /**
   * Checks if specified field has an error.
   * @param fieldName
   * @returns boolean indicating if the field is invalid
   */
  checkError(fieldName: string) {
    const field = this.loginForm.get(fieldName);
    return !!field && field.dirty && field.invalid;
  }

  /**
   * Runs the register method from authService and navigates back to the root page.
   */
  handleLogin() {
    if (!this.loginForm.valid) return;

    this.authService
      .login(this.loginForm.value as UserLoginData)
      .subscribe(() => this.router.navigate(['']));
  }
}
