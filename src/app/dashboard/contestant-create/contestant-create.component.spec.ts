import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestantCreateComponent } from './contestant-create.component';

describe('NewContestantComponent', () => {
  let component: ContestantCreateComponent;
  let fixture: ComponentFixture<ContestantCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContestantCreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContestantCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
