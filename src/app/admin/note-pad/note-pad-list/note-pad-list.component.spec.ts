import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotePadListComponent } from './note-pad-list.component';

describe('NotePadListComponent', () => {
  let component: NotePadListComponent;
  let fixture: ComponentFixture<NotePadListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotePadListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotePadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
