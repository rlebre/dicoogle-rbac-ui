import { Component, OnInit } from '@angular/core';

import { Modal, BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { Overlay, overlayConfigFactory } from 'ngx-modialog';
import { ModalNewEntity, InputField } from '../modal-new-entity/modal-new-entity.component';

import { FormBuilder, Validators } from '@angular/forms';

import { OrganizationsService } from './organizations.service';

import { Observable } from 'rxjs/Rx';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})

export class OrganizationsComponent implements OnInit {
  fields: InputField[];
  dataAvailable: boolean;
  tableData: any;
  isRefreshing = false;
  timer;
  newObjectForm: FormGroup;
  apiEndpoint: String;
  idToDelete: Number;
  showDialogDeleteConfirmation = false;
  showDialogErrorGettingAllFacilities = false;
  errorMessage: String;
  caller: String;

  constructor(public fb: FormBuilder, public modal: Modal, private organizationsService: OrganizationsService) {
    let name = new InputField("name", "Name", "text");

    this.fields = [name];

    this.newObjectForm = this.fb.group({
      name: ["", Validators.compose([Validators.minLength(3), Validators.required])]
    });

    this.apiEndpoint = "organizations";
    this.caller = "Organization";
  }

  ngOnInit() {
    this.requestAllFacilitiesFromServer();
  }


  openNewObjectModalWindow() {
    const dialogRef = this.modal.open(ModalNewEntity,
      overlayConfigFactory({ caller: this.caller, apiName: this.apiEndpoint, fields: this.fields, formGroup: this.newObjectForm }, BSModalContext));
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

    this.requestAllFacilitiesFromServer();
  }

  tickerFunc(tick) {
    this.isRefreshing = false;
  }

  requestAllFacilitiesFromServer() {
    this.organizationsService.getAll(this.apiEndpoint).subscribe(
      response => {
        this.fillTableWithReceivedData(response.json());
      },
      err => {
        this.errorMessage = err.status + " - " + err.statusText;
        this.showDialogErrorGettingAllFacilities = true;
      });
  }

  editObject(organization: any) {
    var form = this.fb.group({
      name: [organization.name, Validators.required],
    })
    
    const dialogRef = this.modal.open(ModalNewEntity, overlayConfigFactory({ caller: this.caller, apiName: this.apiEndpoint, fields: this.fields, formGroup: form, aa: this.refresh }, BSModalContext));
    dialogRef
      .then(dialogRef => {
        dialogRef.result.then(result => this.refresh());
      });
  }

  deleteObject(organization: any) {
    this.showDialogDeleteConfirmation = true;
    this.idToDelete = organization.id;
  }

  showDialogErrorCloseClick() {
    this.showDialogErrorGettingAllFacilities = false;
  }

  deleteConfirmationYes() {
    this.organizationsService.delete(this.apiEndpoint, this.idToDelete).subscribe(response => {
      this.refresh();
      this.showDialogDeleteConfirmation = false;
    });
  }

  deleteConfirmationNo() {
    this.showDialogDeleteConfirmation = false;
  }
}



