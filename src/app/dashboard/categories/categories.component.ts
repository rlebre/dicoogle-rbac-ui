import { Component, OnInit } from '@angular/core';

import { Modal, BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { Overlay, overlayConfigFactory } from 'ngx-modialog';
import { ModalNewEntity, InputField } from '../modal-new-entity/modal-new-entity.component';

import { FormBuilder, Validators } from '@angular/forms';

import { HttpClient } from '../../HttpApiMiddleware.service';

import { Observable } from 'rxjs/Rx';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  fields: InputField[];
  dataAvailable: boolean;
  tableData: any;
  isRefreshing = false;
  timer;
  apiEndpoint: String;
  idToDelete: Number;
  showDialogDeleteConfirmation = false;
  showDialogErrorGettingAllCategories = false;
  errorMessage: String;
  caller: String;

  constructor(public fb: FormBuilder, public modal: Modal, private crudService: HttpClient) {
    let name = new InputField("name", "Name", "text");

    this.fields = [name];
    this.apiEndpoint = "categories";
    this.caller = "Category";
  }

  ngOnInit() {
    this.requestAllCategoriesFromServer();
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

    this.requestAllCategoriesFromServer();
  }

  tickerFunc(tick) {
    this.isRefreshing = false;
  }

  requestAllCategoriesFromServer() {
    this.crudService.getAll(this.apiEndpoint).subscribe(
      response => {
        this.fillTableWithReceivedData(response.json());
      },
      err => {
        this.errorMessage = err.status + " - " + err.statusText;
        this.showDialogErrorGettingAllCategories = true;
      });
  }

  editObject(category: any) {
    var form = this.fb.group({
      name: [category.name, Validators.required],
    })

    const dialogRef = this.modal.open(ModalNewEntity, overlayConfigFactory({ caller: this.caller, apiName: this.apiEndpoint, fields: this.fields, formGroup: form, aa: this.refresh }, BSModalContext));
    dialogRef
      .then(dialogRef => {
        dialogRef.result.then(result => this.refresh());
      });
  }

  deleteObject(category: any) {
    this.showDialogDeleteConfirmation = true;
    this.idToDelete = category.id;
  }

  showDialogErrorCloseClick() {
    this.showDialogErrorGettingAllCategories = false;
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