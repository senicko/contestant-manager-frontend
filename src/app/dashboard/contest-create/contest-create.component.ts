import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ContestCreateData, ContestService } from 'src/app/contest.service';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-contest-create',
  templateUrl: './contest-create.component.html',
})
export class ContestCreateComponent {
  contestCreateForm = this.fb.nonNullable.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private contestService: ContestService,
    private notificationService: NotificationService
  ) {}

  /**
   * Checks if specified field has an error.
   * @param fieldName
   * @returns boolean indicating if the field is invalid
   */
  checkError(fieldName: string) {
    const field = this.contestCreateForm.get(fieldName);
    return !!field && (field.touched || field.dirty) && field.invalid;
  }

  /**
   * handleNewContestant runs logic required to create a new contestant.
   */
  async handleNewContestant(): Promise<void> {
    if (!this.contestCreateForm.valid) return;

    try {
      await firstValueFrom(
        this.contestService.create(
          this.contestCreateForm.value as ContestCreateData
        )
      );
    } catch {
      this.notificationService.push({
        type: 'error',
        message: 'Could not create the contest.',
      });
      return;
    }

    this.notificationService.push({
      type: 'success',
      message: 'Contest has been succesfully created.',
    });

    this.router.navigate(['dashboard', 'contests']);
  }
}
