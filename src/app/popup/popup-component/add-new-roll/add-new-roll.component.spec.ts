import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewRollComponent } from './add-new-roll.component';

describe('AddNewRollComponent', () => {
  let component: AddNewRollComponent;
  let fixture: ComponentFixture<AddNewRollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewRollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewRollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
