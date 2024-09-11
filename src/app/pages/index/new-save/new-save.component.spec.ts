import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSaveComponent } from './new-save.component';

describe('NewSaveComponent', () => {
  let component: NewSaveComponent;
  let fixture: ComponentFixture<NewSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewSaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
