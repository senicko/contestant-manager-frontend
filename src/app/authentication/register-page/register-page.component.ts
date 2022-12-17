import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, UserRegisterData } from 'src/app/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  registerForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/(?=.*[a-zA-Z])(?=.*\d)/),
      ],
    ],
  });

  controls: string[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.controls = Object.keys(this.registerForm.controls);
  }

  /**
   * Checks if specified field has an error.
   * @param fieldName
   * @returns boolean indicating if the field is invalid
   */
  checkError(fieldName: string) {
    const field = this.registerForm.get(fieldName);
    return !!field && field.dirty && field.invalid;
  }

  /**
   * Runs the register method from authService and navigates back to the root page.
   */
  handleRegister() {
    if (!this.registerForm.valid) return;

    const res = this.authService
      .register(this.registerForm.value as UserRegisterData)
      .subscribe({
        next: () => this.router.navigate(['']),
        error: (error) => alert(error.error),
      });

    console.log(res);
  }
}
