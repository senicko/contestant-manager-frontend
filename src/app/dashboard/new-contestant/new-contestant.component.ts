import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ContestantService,
  ContestantCreateData,
} from 'src/app/contestant.service';

@Component({
  selector: 'app-new-contestant',
  templateUrl: './new-contestant.component.html',
})
export class NewContestantComponent {
  contestantForm = this.fb.nonNullable.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private contestantService: ContestantService
  ) {}

  /**
   * handleNewContestant runs logic required to create a new contestant.
   */
  handleNewContestant() {
    if (!this.contestantForm.valid) return;

    this.contestantService
      .create(this.contestantForm.value as ContestantCreateData)
      .subscribe(() => this.router.navigate(['']));
  }

  /**
   * Checks if specified field has an error.
   * @param fieldName
   * @returns boolean indicating if the field is invalid
   */
  checkError(fieldName: string) {
    const field = this.contestantForm.get(fieldName);
    return (field?.touched || field?.dirty) && field.invalid;
  }
}
