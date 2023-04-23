import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMenuPopupComponent } from './add-menu-popup.component';

describe('AddMenuPopupComponent', () => {
  let component: AddMenuPopupComponent;
  let fixture: ComponentFixture<AddMenuPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMenuPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMenuPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
