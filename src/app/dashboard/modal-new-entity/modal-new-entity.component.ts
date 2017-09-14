import { Component, OnInit } from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard, Modal } from 'ngx-modialog';
import { BSModalContext } from 'ngx-modialog/plugins/bootstrap';

import { FormGroup } from '@angular/forms';

import { CreateEntityService } from '../create-entity/create-entity.service';

import { MdDialog, MdDialogRef } from '@angular/material';
import { InfoConfirmDialogComponent } from '../info-confirm-dialog/info-confirm-dialog.component';
import 'rxjs/add/operator/catch';

export class InputField {
  public apiField: String;
  public headerField: String;
  public inputType: String; // text, dropdown, checkbox
  public dropdownFields: String[];

  constructor(apiField: String, headerField: String, inputType: String, dropdownFields?: String[]) {
    this.apiField = apiField;
    this.headerField = headerField;
    this.inputType = inputType;
    this.dropdownFields = dropdownFields;
  }
}

export class CustomModalContext extends BSModalContext {
  public caller: String;
  public apiName: String;
  public fields: InputField[];
  public formGroup: FormGroup;
}

@Component({
  selector: 'app-modal-new-entity',
  templateUrl: './modal-new-entity.component.html',
  styleUrls: ['./modal-new-entity.component.css']
})
export class ModalNewEntity implements ModalComponent<CustomModalContext> {
  context: CustomModalContext;
  dialogRef: MdDialogRef<InfoConfirmDialogComponent>;
  showDialogSuccess = false;
  showDialogError = false;
  entityId: String;
  errorMessage: String;


  constructor(public dialog: DialogRef<CustomModalContext>, private createEntityService: CreateEntityService) {
    this.context = dialog.context;
  }

  closeDialog() {
    this.dialog.close();
  }

  onSubmit(f: any) {
    let apiName = this.context.apiName;
    let data = this.context.formGroup.value;
    this.createEntityService.post(apiName, data).subscribe(res => {
      if (res.status === 200) {
        this.entityId = res.json().id;
        this.showDialogSuccess = true;
      }
    },
      err => {
        this.errorMessage = err.status + " - " + err.statusText;
        this.showDialogError = true;
      });
  }

  showDialogSuccessCloseClick() {
    this.showDialogSuccess = false;
    this.dialog.close();
  }

  showDialogErrorCloseClick() {
    this.showDialogError = false;
  }
}
