import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Earn02Component } from './earn02.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('Earn02Component', () => {
  let component: Earn02Component;
  let fixture: ComponentFixture<Earn02Component>;

  let backButton: DebugElement;
  let pushButton: DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Earn02Component]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Earn02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();

    backButton = fixture.debugElement.query(By.css('div#Back'));
    pushButton = fixture.debugElement.query(By.css('div#Push'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
