import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleListComponent } from './battle-list.component';

describe('BattleListComponent', () => {
  let component: BattleListComponent;
  let fixture: ComponentFixture<BattleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BattleListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BattleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
