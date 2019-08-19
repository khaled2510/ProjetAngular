import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitementSuppressionComponent } from './traitement-suppression.component';

describe('TraitementSuppressionComponent', () => {
  let component: TraitementSuppressionComponent;
  let fixture: ComponentFixture<TraitementSuppressionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraitementSuppressionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraitementSuppressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
