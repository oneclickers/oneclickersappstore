import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizeInputComponent } from './customize-input.component';

describe('CustomizeInputComponent', () => {
  let component: CustomizeInputComponent;
  let fixture: ComponentFixture<CustomizeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomizeInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
