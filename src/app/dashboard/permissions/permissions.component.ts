import { Component, OnInit } from '@angular/core';

import { Modal, BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { Overlay, overlayConfigFactory } from 'ngx-modialog';
import { ModalNewEntity, InputField } from '../modal-new-entity/modal-new-entity.component';

import { FormBuilder, Validators } from '@angular/forms';

import { HttpClient } from '../../HttpApiMiddleware.service';

import { Observable } from 'rxjs/Rx';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {
  fields: InputField[];
  dataAvailable: boolean;
  tableData: any;
  isRefreshing = false;
  timer;
  apiEndpoint: String;
  idToDelete: Number;
  showDialogDeleteConfirmation = false;
  showDialogErrorGettingAllPermissions = false;
  errorMessage: String;
  caller: String;

  constructor(public fb: FormBuilder, public modal: Modal, private crudService: HttpClient) {
    let categoryName = new InputField("categoryName", "Category Name", "text");
    let operationName = new InputField("operationName", "Operation Name", "text");
    let instanceUID = new InputField("resourceUID", "Resource UID", "text");

    this.fields = [categoryName, operationName, instanceUID];
    this.apiEndpoint = "permissions";
    this.caller = "Permission";
  }

  ngOnInit() {
    this.requestAllPermissionsFromServer();
  }


  openNewObjectModalWindow() {
    let newObjectForm = this.fb.group({
      categoryName: ["", Validators.compose([Validators.minLength(3), Validators.required])],
      operationName: ["", Validators.compose([Validators.minLength(3), Validators.required])],
      resourceUID: [""]
    });

    const dialogRef = this.modal.open(ModalNewEntity,
      overlayConfigFactory({ caller: this.caller, apiName: this.apiEndpoint, fields: this.fields, formGroup: newObjectForm }, BSModalContext));
    dialogRef
      .then(dialogRef => {
        dialogRef.result.then(result => this.refresh());
      });
  }

  fillTableWithReceivedData(jsonList) {
    if (jsonList.length === 0) {
      this.dataAvailable = false;
      return;
    }

    this.tableData = jsonList;
    this.dataAvailable = true;
  }


  refresh() {
    this.isRefreshing = true;
    this.timer = Observable.timer(1000);
    this.timer.subscribe(t => this.tickerFunc(t));

    this.requestAllPermissionsFromServer();
  }

  tickerFunc(tick) {
    this.isRefreshing = false;
  }

  requestAllPermissionsFromServer() {
    this.crudService.getAll(this.apiEndpoint).subscribe(
      response => {
        this.fillTableWithReceivedData(response.json());
      },
      err => {
        this.errorMessage = err.status + " - " + err.statusText;
        this.showDialogErrorGettingAllPermissions = true;
      });
  }

  editObject(permission: any) {
    var form = this.fb.group({
      categoryName: [permission.category.name, Validators.compose([Validators.minLength(3), Validators.required])],
      operationName: [permission.operation.name, Validators.compose([Validators.minLength(3), Validators.required])],
      resourceUID: [permission.resource === null ? "" : permission.resource.instanceUID]
    });
    const dialogRef = this.modal.open(ModalNewEntity, overlayConfigFactory({ caller: this.caller, apiName: this.apiEndpoint, fields: this.fields, formGroup: form, aa: this.refresh }, BSModalContext));
    dialogRef
      .then(dialogRef => {
        dialogRef.result.then(result => this.refresh());
      });
  }

  deleteObject(permission: any) {
    this.showDialogDeleteConfirmation = true;
    this.idToDelete = permission.id;
  }

  showDialogErrorCloseClick() {
    this.showDialogErrorGettingAllPermissions = false;
  }

  deleteConfirmationYes() {
    this.crudService.deleteById(this.apiEndpoint, this.idToDelete).subscribe(response => {
      this.refresh();
      this.showDialogDeleteConfirmation = false;
    });
  }

  deleteConfirmationNo() {
    this.showDialogDeleteConfirmation = false;
  }
}
