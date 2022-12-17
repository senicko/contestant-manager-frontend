import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contestant, ContestantService } from '../../contestant.service';
import { firstValueFrom } from 'rxjs';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-contestant-edit',
  templateUrl: './contestant-edit.component.html',
})
export class ContestantEditComponent implements OnInit {
  contestant!: Contestant;

  contestantForm = this.fb.nonNullable.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    gender: ['', Validators.required],
    birthDate: ['', [Validators.required]],
    skiLength: [0, [Validators.required, Validators.min(1)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private contestantService: ContestantService,
    private notificationService: NotificationService
  ) {}

  async ngOnInit(): Promise<void> {
    const params = await firstValueFrom(this.route.paramMap);
    const id = params.get('id')!;
    await this.loadContestant(id);
  }

  /**
   * Checks if specified field has an error.
   * @param fieldName
   * @returns boolean indicating if the field is invalid
   */
  checkError(fieldName: string): boolean {
    const field = this.contestantForm.get(fieldName);
    return !!field && (field.touched || field.dirty) && field.invalid;
  }

  /**
   * Handles edit of contestant.
   */
  async handleEdit(): Promise<void> {
    if (!this.contestantForm.valid) return;

    try {
      await firstValueFrom(
        this.contestantService.edit(
          this.contestant.id,
          this.contestantForm.value
        )
      );
    } catch {
      this.notificationService.push({
        type: 'error',
        message: 'Could not edit the contestant.',
      });
      return;
    }

    this.notificationService.push({
      type: 'success',
      message: 'The contestant has been edited.',
    });

    this.router.navigate(['/dashboard/contestants']);
  }

  /**
   * Loads currently edited contestant.
   * @param id loaded contestant id
   */
  private async loadContestant(id: string): Promise<void> {
    this.contestant = await firstValueFrom(this.contestantService.get(id));

    const { id: _, ...data } = this.contestant;
    this.contestantForm.setValue(data);
  }
}
