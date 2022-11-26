import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { ContestantListComponent } from './contestant-list/contestant-list.component';
import { RouterModule } from '@angular/router';
import { NewContestantComponent } from './new-contestant/new-contestant.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    HomeComponent,
    ContestantListComponent,
    NewContestantComponent,
    DashboardComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule, ReactiveFormsModule],
})
export class DashboardModule {}
