import { Component, OnInit } from '@angular/core';
import { ContestService } from './contest.service';
import { ContestantService } from './contestant.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private contestantsService: ContestantService,
    private contestService: ContestService
  ) {}

  ngOnInit(): void {
    this.contestantsService.getAll();
    this.contestService.getAll();
  }
}
