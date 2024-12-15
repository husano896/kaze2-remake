import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugEventsComponent } from './debug-events.component';

describe('DebugEventsComponent', () => {
  let component: DebugEventsComponent;
  let fixture: ComponentFixture<DebugEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebugEventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebugEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
