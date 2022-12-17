import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContestService, PopulatedContest } from 'src/app/contest.service';
import { Contestant, ContestantService } from 'src/app/contestant.service';
import { contestantsHeaders } from '../../domain/contestants';
import { RowAction } from '../../shared/table/table.component';
import { firstValueFrom } from 'rxjs';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-contest-preview',
  templateUrl: './contest-edit.component.html',
})
export class ContestEditComponent implements OnInit {
  contest!: PopulatedContest;
  availableContestants: Contestant[] = [];

  headers = contestantsHeaders;

  actions: RowAction[] = [
    {
      name: 'Remove from contest',
      handler: async (row: Contestant) => {
        try {
          await firstValueFrom(
            this.contestService.removeContestant(this.contest.id, row.id)
          );
        } catch {
          this.notificationService.push({
            type: 'success',
            message: 'Could not remove the contest.',
          });
          return;
        }

        this.notificationService.push({
          type: 'success',
          message: 'Contest has beed removed.',
        });

        this.contest.contestants = this.contest.contestants.filter(
          (contestant) => contestant.id !== row.id
        );

        await this.loadUnassignedContestants();
      },
    },
  ];

  contestantAssignForm = this.fb.nonNullable.group({
    id: ['', [Validators.required]],
  });

  contestEditForm = this.fb.nonNullable.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
  });

  constructor(
    private contestService: ContestService,
    private contestantService: ContestantService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {}

  async ngOnInit(): Promise<void> {
    const params = await firstValueFrom(this.route.paramMap);
    const id = parseInt(params.get('id')!);
    await this.loadContest(id);
  }

  /**
   * Checks if specified field has an error.
   * @param fieldName
   * @returns boolean indicating if the field is invalid
   */
  checkError(fieldName: string): boolean {
    const field = this.contestEditForm.get(fieldName);
    return !!field && field.dirty && field.invalid;
  }

  /**
   * Edits the contest.
   */
  async editContest(): Promise<void> {
    if (!this.contestEditForm.valid) return;

    try {
      await firstValueFrom(
        this.contestService.edit(this.contest.id, this.contestEditForm.value)
      );
    } catch {
      this.notificationService.push({
        type: 'error',
        message: 'Could not edit the contest.',
      });
      return;
    }

    this.notificationService.push({
      type: 'success',
      message: 'Contest has been edited.',
    });
  }

  /**
   * Assigns the selected contestant to current contest.
   */
  async assignContestant(): Promise<void> {
    if (!this.contestantAssignForm.valid) return;

    try {
      await firstValueFrom(
        this.contestService.addContestant(
          this.contest!.id!,
          parseInt(this.contestantAssignForm.value.id!)
        )
      );
    } catch {
      this.notificationService.push({
        type: 'error',
        message: 'Could not assign the contestant.',
      });
      return;
    }

    const assignedId = parseInt(this.contestantAssignForm.value.id!);
    const contestant = this.availableContestants.find(
      ({ id }) => id === assignedId
    )!;

    console.log(this.contest.contestants, contestant);
    this.contest.contestants.push(contestant);
    console.log(this.contest.contestants);

    this.notificationService.push({
      type: 'success',
      message: 'Contestant has been assigned',
    });

    this.contestantAssignForm.setValue({ id: '' });
    await this.loadUnassignedContestants();
  }

  /**
   * Loads contestants that can be added to the contest.
   */
  private async loadUnassignedContestants(): Promise<void> {
    const contestants = await firstValueFrom(this.contestantService.getAll());

    const isInContest = (contestant: Contestant) =>
      this.contest.contestants.some(({ id }) => id === contestant.id);

    this.availableContestants = contestants.filter(
      (contestant) => !isInContest(contestant)
    );
  }

  /**
   * Loads currently edited contestant.
   * @param id loaded contest id
   */
  private async loadContest(id: number): Promise<void> {
    this.contest = await firstValueFrom(this.contestService.get(id));

    const { name } = this.contest;
    this.contestEditForm.setValue({ name });

    await this.loadUnassignedContestants();
  }
}
