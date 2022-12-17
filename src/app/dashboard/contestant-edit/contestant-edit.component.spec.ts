import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestantEditComponent } from './contestant-edit.component';

describe('ContestantEditComponent', () => {
  let component: ContestantEditComponent;
  let fixture: ComponentFixture<ContestantEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContestantEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContestantEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
