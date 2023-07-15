import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUiComponent } from './create-ui.component';

describe('CreateUiComponent', () => {
  let component: CreateUiComponent;
  let fixture: ComponentFixture<CreateUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
