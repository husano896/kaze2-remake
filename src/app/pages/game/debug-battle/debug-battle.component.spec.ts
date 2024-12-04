import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugBattleComponent } from './debug-battle.component';

describe('DebugBattleComponent', () => {
  let component: DebugBattleComponent;
  let fixture: ComponentFixture<DebugBattleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebugBattleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebugBattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
