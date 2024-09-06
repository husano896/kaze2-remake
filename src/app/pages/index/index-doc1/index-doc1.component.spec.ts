import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexDoc1Component } from './index-doc1.component';

describe('IndexDoc1Component', () => {
  let component: IndexDoc1Component;
  let fixture: ComponentFixture<IndexDoc1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexDoc1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexDoc1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
