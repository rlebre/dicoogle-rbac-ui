import { Component, OnInit } from '@angular/core';

import { Modal, BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { Overlay, overlayConfigFactory } from 'ngx-modialog';
import { ModalNewEntity, InputField } from '../modal-new-entity/modal-new-entity.component';

import { FormBuilder, Validators } from '@angular/forms';

import { HttpClient } from '../../HttpApiMiddleware.service';

import { Observable } from 'rxjs/Rx';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.css'],
  providers: [Modal]
})
export class FacilitiesComponent implements OnInit {
  fields: InputField[];
  dataAvailable: boolean;
  tableData: any;
  isRefreshing = false;
  timer;
  newFacilityForm: FormGroup;
  apiEndpoint: String;
  facilityIdToDelete: Number;
  showDialogDeleteConfirmation = false;
  showDialogErrorGettingAllFacilities = false;
  errorMessage: String;

  constructor(public fb: FormBuilder, public modal: Modal, private crudService: HttpClient) {
    let uuidAtCP = new InputField("uuidAtCP", "UUID at CP", "text");
    let city = new InputField("city", "City", "text");
    let country = new InputField("country", "Country", "text");
    let name = new InputField("name", "Name", "text");
    let number = new InputField("number", "Number", "number");
    let postalCode = new InputField("postalCode", "Postal Code", "text");
    let street = new InputField("street", "Street", "text");
    let organization = new InputField("idOrganization", "Organization ID", "number?");

    this.fields = [uuidAtCP, city, country, name, number, postalCode, street, organization];

    this.newFacilityForm = this.fb.group({
      uuidAtCP: ["", Validators.required],
      city: ["", Validators.required],
      country: ["", Validators.compose([Validators.minLength(2), Validators.required])],
      name: ["", Validators.required],
      number: ["", Validators.required],
      postalCode: ["", Validators.required],
      street: ["", Validators.required],
      idOrganization: [""]
    });

    this.apiEndpoint = "facilities";
  }

  ngOnInit() {
    this.requestAllFacilitiesFromServer();
  }


  openNewFacilityModalWindow() {
    const dialogRef = this.modal.open(ModalNewEntity,
      overlayConfigFactory({ caller: "Facility", apiName: this.apiEndpoint, fields: this.fields, formGroup: this.newFacilityForm }, BSModalContext));
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
    this.crudService.getAll(this.apiEndpoint).subscribe(
      response => {
        this.fillTableWithReceivedData(response.json());
      },
      err => {
        this.errorMessage = err.status + " - " + err.statusText;
        this.showDialogErrorGettingAllFacilities = true;
      });
  }

  editFacility(facility: any) {
    var form = this.fb.group({
      id: [facility.id],
      uuidAtCP: [facility.uuid, Validators.required],
      city: [facility.city, Validators.required],
      country: [facility.country, Validators.compose([Validators.minLength(2), Validators.required])],
      name: [facility.name, Validators.required],
      number: [facility.number, Validators.required],
      postalCode: [facility.postalCode, Validators.required],
      street: [facility.street, Validators.required],
      idOrganization: [facility.idOrganization]
    })

    const dialogRef = this.modal.open(ModalNewEntity, overlayConfigFactory({ caller: "Facility", apiName: this.apiEndpoint, fields: this.fields, formGroup: form, aa: this.refresh }, BSModalContext));
    dialogRef
      .then(dialogRef => {
        dialogRef.result.then(result => this.refresh());
      });
  }

  deleteFacility(facility: any) {
    this.showDialogDeleteConfirmation = true;
    this.facilityIdToDelete = facility.id;
  }

  showDialogErrorCloseClick() {
    this.showDialogErrorGettingAllFacilities = false;
  }

  deleteConfirmationYes() {
    this.crudService.deleteById(this.apiEndpoint, this.facilityIdToDelete).subscribe(response => {
      this.refresh();
      this.showDialogDeleteConfirmation = false;
    });
  }

  deleteConfirmationNo() {
    this.showDialogDeleteConfirmation = false;
  }
}



