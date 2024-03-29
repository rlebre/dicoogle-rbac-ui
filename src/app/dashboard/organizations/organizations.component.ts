import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Modal, BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { Overlay, overlayConfigFactory } from 'ngx-modialog';
import { ModalNewEntity, InputField } from '../modal-new-entity/modal-new-entity.component';

import { FormBuilder, Validators } from '@angular/forms';

import { HttpClient } from '../../HttpApiMiddleware.service';

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
  showDialogErrorGettingAllOrganizations = false;
  errorMessage: String;
  caller: String;

  constructor(public fb: FormBuilder, public modal: Modal, private crudService: HttpClient, private router: Router) {
    let name = new InputField("name", "Name", "text");

    this.fields = [name];

    this.newObjectForm = this.fb.group({
      name: ["", Validators.compose([Validators.minLength(3), Validators.required])]
    });

    this.apiEndpoint = "organizations";
    this.caller = "Organization";
  }

  ngOnInit() {
    this.requestAllOrganizationsFromServer();
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

    this.requestAllOrganizationsFromServer();
  }

  tickerFunc(tick) {
    this.isRefreshing = false;
  }

  requestAllOrganizationsFromServer() {
    this.crudService.getAll(this.apiEndpoint).subscribe(
      response => {
        this.fillTableWithReceivedData(response.json());
      },
      err => {
        this.errorMessage = err.status + " - " + err.statusText;
        this.showDialogErrorGettingAllOrganizations = true;
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
    this.showDialogErrorGettingAllOrganizations = false;
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

  rowClick(organization: any) {
    this.router.navigate(['dashboard/organization', organization.id]);
  }
}



