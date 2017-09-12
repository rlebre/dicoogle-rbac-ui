import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewFacility } from './modal-new-facility.component';

describe('ModalNewFacilityComponent', () => {
  let component: ModalNewFacility;
  let fixture: ComponentFixture<ModalNewFacility>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalNewFacility ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNewFacility);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
