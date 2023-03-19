import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPartComponent } from './chat-part.component';

describe('ChatPartComponent', () => {
  let component: ChatPartComponent;
  let fixture: ComponentFixture<ChatPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
