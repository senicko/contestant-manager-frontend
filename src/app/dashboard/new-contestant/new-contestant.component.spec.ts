import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewContestantComponent } from './new-contestant.component';

describe('NewContestantComponent', () => {
  let component: NewContestantComponent;
  let fixture: ComponentFixture<NewContestantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewContestantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewContestantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
