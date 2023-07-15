import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRollComponent } from './user-roll.component';

describe('UserRollComponent', () => {
  let component: UserRollComponent;
  let fixture: ComponentFixture<UserRollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
