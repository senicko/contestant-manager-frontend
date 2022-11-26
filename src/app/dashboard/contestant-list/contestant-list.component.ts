import { Component, OnInit } from '@angular/core';
import { Contestant, ContestantService } from 'src/app/contestant.service';

@Component({
  selector: 'app-contestant-list',
  templateUrl: './contestant-list.component.html',
})
export class ContestantListComponent implements OnInit {
  contestants: Contestant[] = [];

  constructor(private contestantService: ContestantService) {}

  ngOnInit(): void {
    this.contestantService.getAll().subscribe((contestants) => {
      this.contestants = contestants;
    });
  }
}
