import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugAnimComponent } from './debug-anim.component';

describe('DebugAnimComponent', () => {
  let component: DebugAnimComponent;
  let fixture: ComponentFixture<DebugAnimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebugAnimComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebugAnimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
