import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarreNavigationAdminComponent } from './barre-navigation-admin.component';

describe('BarreNavigationAdminComponent', () => {
  let component: BarreNavigationAdminComponent;
  let fixture: ComponentFixture<BarreNavigationAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarreNavigationAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarreNavigationAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
