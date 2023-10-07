import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckEditComponent } from './deck-edit.component';

describe('DeckEditComponent', () => {
  let component: DeckEditComponent;
  let fixture: ComponentFixture<DeckEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeckEditComponent]
    });
    fixture = TestBed.createComponent(DeckEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
