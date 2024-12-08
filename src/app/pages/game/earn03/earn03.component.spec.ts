import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Earn03Component } from './earn03.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('Earn03Component', () => {
  let component: Earn03Component;
  let fixture: ComponentFixture<Earn03Component>;

  let backButton: DebugElement;
  let pushButton: DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Earn03Component]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Earn03Component);
    component = fixture.componentInstance;
    fixture.detectChanges();

    backButton = fixture.debugElement.query(By.css('div#Back'));
    pushButton = fixture.debugElement.query(By.css('div#Push'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
