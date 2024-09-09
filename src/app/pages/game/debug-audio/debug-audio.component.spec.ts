import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugAudioComponent } from './debug-audio.component';

describe('DebugAudioComponent', () => {
  let component: DebugAudioComponent;
  let fixture: ComponentFixture<DebugAudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebugAudioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebugAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
