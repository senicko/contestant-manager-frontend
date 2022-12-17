import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestantSummaryComponent } from './contestant-summary.component';

describe('ContestantSummaryComponent', () => {
  let component: ContestantSummaryComponent;
  let fixture: ComponentFixture<ContestantSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContestantSummaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContestantSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
