import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenchiComponent } from './senchi.component';

describe('SenchiComponent', () => {
  let component: SenchiComponent;
  let fixture: ComponentFixture<SenchiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SenchiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SenchiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
