import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MigrateGamecanComponent } from './migrate-gamecan.component';

describe('MigrateGamecanComponent', () => {
  let component: MigrateGamecanComponent;
  let fixture: ComponentFixture<MigrateGamecanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MigrateGamecanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MigrateGamecanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
