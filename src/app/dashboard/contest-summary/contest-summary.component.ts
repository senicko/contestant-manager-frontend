import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { NotificationService } from 'src/app/notification.service';
import { RowAction, TableHeader } from 'src/app/shared/table/table.component';
import { Contest, ContestService } from '../../contest.service';

@Component({
  selector: 'app-contest-summary',
  templateUrl: './contest-summary.component.html',
})
export class ContestSummaryComponent implements OnInit {
  contests: Contest[] = [];

  headers: TableHeader[] = [{ label: 'Name', accessor: 'name' }];

  actions: RowAction[] = [
    {
      name: 'Edit',
      handler: ({ id }: Contest) =>
        this.router.navigate(['dashboard', 'contests', id]),
    },
    {
      name: 'Delete',
      handler: async ({ id: deletedId }: Contest) => {
        try {
          await firstValueFrom(this.contestService.delete(deletedId));
        } catch {
          this.notificationService.push({
            type: 'error',
            message: 'Could not delete the contest.',
          });
          return;
        }

        this.contests = this.contests.filter(({ id }) => id !== deletedId);

        this.notificationService.push({
          type: 'success',
          message: 'Contest has been deleted.',
        });
      },
    },
  ];

  constructor(
    private contestService: ContestService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  async ngOnInit(): Promise<void> {
    this.contests = await firstValueFrom(this.contestService.getAll());
  }
}
