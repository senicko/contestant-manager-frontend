import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import {
  ContestantCreateData,
  ContestantService,
} from 'src/app/contestant.service';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-contestant-create',
  templateUrl: './contestant-create.component.html',
})
export class ContestantCreateComponent {
  contestantForm = this.fb.nonNullable.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    gender: ['male', Validators.required],
    birthDate: ['', [Validators.required]],
    skiLength: [0, [Validators.required, Validators.min(1)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private contestantService: ContestantService,
    private notificationService: NotificationService
  ) {}

  /**
   * Checks if specified field has an error.
   * @param fieldName
   * @returns boolean indicating if the field is invalid
   */
  checkError(fieldName: string) {
    const field = this.contestantForm.get(fieldName);
    return !!field && (field.touched || field.dirty) && field.invalid;
  }

  /**
   * Creates a new contestant.
   */
  async handleNewContestant(): Promise<void> {
    if (!this.contestantForm.valid) return;

    const { birthDate, skiLength, ...all } = this.contestantForm.value;

    try {
      await firstValueFrom(
        this.contestantService.create({
          ...(all as ContestantCreateData),
          birthDate: new Date(birthDate!).toUTCString(),
          skiLength: skiLength!,
        })
      );
    } catch {
      this.notificationService.push({
        type: 'error',
        message: 'Could not create the user.',
      });
      return;
    }

    this.notificationService.push({
      type: 'success',
      message: 'The user has been created.',
    });

    this.router.navigate(['dashboard', 'contestants']);
  }
}
