import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [RegisterPageComponent, LoginPageComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, SharedModule],
  exports: [RegisterPageComponent],
})
export class AuthenticationModule {}
