import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestantListComponent } from './contestant-list.component';

describe('ContestantListComponent', () => {
  let component: ContestantListComponent;
  let fixture: ComponentFixture<ContestantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContestantListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContestantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
