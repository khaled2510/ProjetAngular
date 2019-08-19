import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingCompteComponent } from './listing-compte.component';

describe('ListingCompteComponent', () => {
  let component: ListingCompteComponent;
  let fixture: ComponentFixture<ListingCompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingCompteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
