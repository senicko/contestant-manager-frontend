import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterPageComponent } from './authentication/register-page/register-page.component';
import { HomeComponent } from './dashboard/home/home.component';
import { AuthorisedGuard } from './authorised.guard';
import { UnauthorisedGuard } from './unauthorised.guard';
import { LoginPageComponent } from './authentication/login-page/login-page.component';
import { NewContestantComponent } from './dashboard/new-contestant/new-contestant.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterPageComponent,
    canActivate: [UnauthorisedGuard],
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [UnauthorisedGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthorisedGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'new',
        component: NewContestantComponent,
      },
    ],
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
