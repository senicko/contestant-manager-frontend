import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './authentication/login-page/login-page.component';
import { RegisterPageComponent } from './authentication/register-page/register-page.component';
import { ContestCreateComponent } from './dashboard/contest-create/contest-create.component';
import { ContestEditComponent } from './dashboard/contest-edit/contest-edit.component';
import { ContestSummaryComponent } from './dashboard/contest-summary/contest-summary.component';
import { ContestantCreateComponent } from './dashboard/contestant-create/contestant-create.component';
import { ContestantEditComponent } from './dashboard/contestant-edit/contestant-edit.component';
import { ContestantSummaryComponent } from './dashboard/contestants-summary/contestant-summary.component';
import { DashboardLayoutComponent } from './dashboard/dashboard-layout/dashboard-layout.component';
import { AuthorisedGuard } from './guards/authorised.guard';
import { UnauthorisedGuard } from './guards/unauthorised.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [AuthorisedGuard],
    children: [
      {
        path: 'contestants',
        component: ContestantSummaryComponent,
      },
      {
        path: 'contestants/new',
        component: ContestantCreateComponent,
      },
      {
        path: 'contestants/:id',
        component: ContestantEditComponent,
      },
      {
        path: 'contests',
        component: ContestSummaryComponent,
      },
      {
        path: 'contests/new',
        component: ContestCreateComponent,
      },
      {
        path: 'contests/:id',
        component: ContestEditComponent,
      },
    ],
  },
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
  { path: '', redirectTo: 'dashboard/contestants', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
