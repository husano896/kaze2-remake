import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexDoc3Component } from './index-doc3.component';

describe('IndexDoc3Component', () => {
  let component: IndexDoc3Component;
  let fixture: ComponentFixture<IndexDoc3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexDoc3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexDoc3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
