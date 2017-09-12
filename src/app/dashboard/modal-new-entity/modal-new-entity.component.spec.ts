import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewEntity } from './modal-new-entity.component';

describe('ModalNewFacilityComponent', () => {
  let component: ModalNewEntity;
  let fixture: ComponentFixture<ModalNewEntity>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalNewEntity ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNewEntity);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
