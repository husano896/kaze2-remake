import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexDoc2Component } from './index-doc2.component';

describe('IndexDoc2Component', () => {
  let component: IndexDoc2Component;
  let fixture: ComponentFixture<IndexDoc2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexDoc2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexDoc2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
