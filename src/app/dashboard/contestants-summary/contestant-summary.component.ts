import { Component, OnInit } from '@angular/core';
import { Contestant, ContestantService } from 'src/app/contestant.service';
import { RowAction } from 'src/app/shared/table/table.component';
import { contestantsHeaders } from '../../domain/contestants';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-contestant-summary',
  templateUrl: './contestant-summary.component.html',
})
export class ContestantSummaryComponent implements OnInit {
  contestants: Contestant[] = [];

  headers = contestantsHeaders;

  actions: RowAction[] = [
    {
      name: 'Edit',
      handler: (row) =>
        this.router.navigate([`/dashboard/contestants/${row.id}`]),
    },
    {
      name: 'Delete',
      handler: async ({ id: deletedId }: Contestant) => {
        try {
          await firstValueFrom(this.contestantService.remove(deletedId));
        } catch {
          this.notificationService.push({
            type: 'error',
            message: 'Could not delete the contestant.',
          });
          return;
        }

        this.contestants = this.contestants.filter(
          ({ id }) => id !== deletedId
        );

        this.notificationService.push({
          type: 'success',
          message: 'Contestant has been deleted.',
        });
      },
    },
  ];

  constructor(
    private contestantService: ContestantService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.contestants = await firstValueFrom(this.contestantService.getAll());
  }
}
