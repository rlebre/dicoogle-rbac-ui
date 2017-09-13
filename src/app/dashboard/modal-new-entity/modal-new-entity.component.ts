import { Component, OnInit } from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard } from 'ngx-modialog';
import { BSModalContext } from 'ngx-modialog/plugins/bootstrap';

import { FormGroup } from '@angular/forms';

import { CreateEntityService } from '../create-entity/create-entity.service';

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
export class ModalNewEntity implements CloseGuard, ModalComponent<CustomModalContext> {
  context: CustomModalContext;

  constructor(public dialog: DialogRef<CustomModalContext>, private createEntityService: CreateEntityService) {
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

  onSubmit(f: any) {
    //console.log(this.context);
    //console.log(this.context.formGroup.value);
    let apiName = this.context.apiName;
    let data = this.context.formGroup.value;
    this.createEntityService.post(apiName, data).subscribe();
  }
}
