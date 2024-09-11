import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveDataEditorComponent } from './save-data-editor.component';

describe('SaveDataEditorComponent', () => {
  let component: SaveDataEditorComponent;
  let fixture: ComponentFixture<SaveDataEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveDataEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveDataEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
