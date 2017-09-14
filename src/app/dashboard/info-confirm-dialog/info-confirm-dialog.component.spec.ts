import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoConfirmDialogComponent } from './info-confirm-dialog.component';

describe('InfoConfirmDialogComponent', () => {
  let component: InfoConfirmDialogComponent;
  let fixture: ComponentFixture<InfoConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoConfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
