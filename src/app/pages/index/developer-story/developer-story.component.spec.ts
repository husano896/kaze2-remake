import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperStoryComponent } from './developer-story.component';

describe('DeveloperStoryComponent', () => {
  let component: DeveloperStoryComponent;
  let fixture: ComponentFixture<DeveloperStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeveloperStoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeveloperStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
