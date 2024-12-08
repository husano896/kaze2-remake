import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DungeonComponent } from './dungeon.component';

describe('DungeonComponent', () => {
  let component: DungeonComponent;
  let fixture: ComponentFixture<DungeonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DungeonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DungeonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
