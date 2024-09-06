import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragongameComponent } from './dragongame.component';

describe('DragongameComponent', () => {
  let component: DragongameComponent;
  let fixture: ComponentFixture<DragongameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragongameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragongameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
