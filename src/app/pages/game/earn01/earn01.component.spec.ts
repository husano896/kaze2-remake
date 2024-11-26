import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Earn01Component } from './earn01.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('Earn01Component', () => {
  let component: Earn01Component;
  let fixture: ComponentFixture<Earn01Component>;

  let backButton: DebugElement;
  let pushButton: DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Earn01Component]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Earn01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();

    backButton = fixture.debugElement.query(By.css('div#Back'));
    pushButton = fixture.debugElement.query(By.css('div#Push'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('旋轉中應不可離開', () => {
    component.rollingInterval = 1;
    fixture.detectChanges();
    expect((backButton.nativeElement as HTMLButtonElement).disabled).toBeTruthy()
  })

  it('[SoftLock] 旋轉中PUSH按鈕應保持可按', () => {
    component.rollingInterval = 1;
    fixture.detectChanges()
    expect((pushButton.nativeElement as HTMLButtonElement).disabled).toBeFalsy()
  })
});
