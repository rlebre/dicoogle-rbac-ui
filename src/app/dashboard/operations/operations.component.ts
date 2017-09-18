import { Component, OnInit } from '@angular/core';

import { Modal, BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { Overlay, overlayConfigFactory } from 'ngx-modialog';
import { ModalNewEntity, InputField } from '../modal-new-entity/modal-new-entity.component';

import { FormBuilder, Validators } from '@angular/forms';

import { OperationsService } from './operations.service';

import { Observable } from 'rxjs/Rx';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {
  fields: InputField[];
  dataAvailable: boolean;
  tableData: any;
  isRefreshing = false;
  timer;
  apiEndpoint: String;
  idToDelete: Number;
  showDialogDeleteConfirmation = false;
  showDialogErrorGettingAllOperations = false;
  errorMessage: String;
  caller: String;

  constructor(public fb: FormBuilder, public modal: Modal, private operationsService: OperationsService) {
    let name = new InputField("name", "Name", "text");

    this.fields = [name];
    this.apiEndpoint = "operations";
    this.caller = "Operation";
  }

  ngOnInit() {
    this.requestAllOperationsFromServer();
  }


  openNewObjectModalWindow() {
    let newObjectForm = this.fb.group({
      name: ["", Validators.compose([Validators.minLength(3), Validators.required])]
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

    this.requestAllOperationsFromServer();
  }

  tickerFunc(tick) {
    this.isRefreshing = false;
  }

  requestAllOperationsFromServer() {
    this.operationsService.getAll(this.apiEndpoint).subscribe(
      response => {
        this.fillTableWithReceivedData(response.json());
      },
      err => {
        this.errorMessage = err.status + " - " + err.statusText;
        this.showDialogErrorGettingAllOperations = true;
      });
  }

  editObject(operation: any) {
    var form = this.fb.group({
      name: [operation.name, Validators.required],
    })

    const dialogRef = this.modal.open(ModalNewEntity, overlayConfigFactory({ caller: this.caller, apiName: this.apiEndpoint, fields: this.fields, formGroup: form, aa: this.refresh }, BSModalContext));
    dialogRef
      .then(dialogRef => {
        dialogRef.result.then(result => this.refresh());
      });
  }

  deleteObject(operation: any) {
    this.showDialogDeleteConfirmation = true;
    this.idToDelete = operation.id;
  }

  showDialogErrorCloseClick() {
    this.showDialogErrorGettingAllOperations = false;
  }

  deleteConfirmationYes() {
    this.operationsService.delete(this.apiEndpoint, this.idToDelete).subscribe(response => {
      this.refresh();
      this.showDialogDeleteConfirmation = false;
    });
  }

  deleteConfirmationNo() {
    this.showDialogDeleteConfirmation = false;
  }
}