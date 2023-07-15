import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiManagerComponent } from './ui-manager.component';

describe('UiManagerComponent', () => {
  let component: UiManagerComponent;
  let fixture: ComponentFixture<UiManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
