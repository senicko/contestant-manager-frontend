import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestSummaryComponent } from './contest-summary.component';

describe('ContestSummaryComponent', () => {
  let component: ContestSummaryComponent;
  let fixture: ComponentFixture<ContestSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContestSummaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContestSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
