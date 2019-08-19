import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvenementCreerComponent } from './evenements-creer.component';

describe('EvenementCreerComponent', () => {
  let component: EvenementCreerComponent;
  let fixture: ComponentFixture<EvenementCreerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvenementCreerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvenementCreerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
