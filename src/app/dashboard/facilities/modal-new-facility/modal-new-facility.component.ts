import { Component, OnInit } from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard } from 'ngx-modialog';
import { BSModalContext } from 'ngx-modialog/plugins/bootstrap';

export class CustomModalContext extends BSModalContext {
  public caller : String;
  public fields : String[];
}

@Component({
  selector: 'app-modal-new-facility',
  templateUrl: './modal-new-facility.component.html',
  styleUrls: ['./modal-new-facility.component.css']
})
export class ModalNewEntity implements CloseGuard, ModalComponent<CustomModalContext> {
  context: CustomModalContext;

  constructor(public dialog: DialogRef<CustomModalContext>) {
    this.context = dialog.context;
  }

  
  beforeDismiss(): boolean {
    return true;
  }

  beforeClose(): boolean {
    return true;
  }

  closeDialog() {
    this.dialog.close();
  }
}
