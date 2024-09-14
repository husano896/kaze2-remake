import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberToImageComponent } from './number-to-image.component';

describe('NumberToImageComponent', () => {
  let component: NumberToImageComponent;
  let fixture: ComponentFixture<NumberToImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberToImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberToImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
