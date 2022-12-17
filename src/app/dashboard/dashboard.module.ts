import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ContestCreateComponent } from './contest-create/contest-create.component';
import { ContestEditComponent } from './contest-edit/contest-edit.component';
import { ContestSummaryComponent } from './contest-summary/contest-summary.component';
import { ContestantCreateComponent } from './contestant-create/contestant-create.component';
import { ContestantEditComponent } from './contestant-edit/contestant-edit.component';
import { ContestantSummaryComponent } from './contestants-summary/contestant-summary.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { NotificationQueueComponent } from './notification-queue/notification-queue.component';

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    ContestantCreateComponent,
    ContestantEditComponent,
    ContestantSummaryComponent,
    ContestCreateComponent,
    ContestEditComponent,
    ContestSummaryComponent,
    NotificationQueueComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class DashboardModule {}
