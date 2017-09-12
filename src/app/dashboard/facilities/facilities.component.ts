import { Component, OnInit } from '@angular/core';

import { Modal, BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { Overlay, overlayConfigFactory } from 'ngx-modialog';
import { ModalNewEntity, InputField } from '../modal-new-entity/modal-new-entity.component';

import { FormBuilder, Validators } from '@angular/forms';

import { FacilitiesService } from './facilities.service';


@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.css'],
  providers: [Modal]
})
export class FacilitiesComponent implements OnInit {
  fields: InputField[];

  public newFacilityForm = this.fb.group({
    uuidAtCP: ["", Validators.required],
    city: ["", Validators.required],
    country: ["", Validators.compose([Validators.minLength(2), Validators.required])],
    name: ["", Validators.required],
    number: ["", Validators.required],
    postalCode: ["", Validators.required],
    street: ["", Validators.required],
    idOrganization: [""]
  });

  constructor(public fb: FormBuilder, public modal: Modal, private facilitiesService : FacilitiesService) {
    let uuidAtCP = new InputField("uuidAtCP", "UUID at CP", "text");
    let city = new InputField("city", "City", "text");
    let country = new InputField("country", "Country", "text");
    let name = new InputField("name", "Name", "text");
    let number = new InputField("number", "Number", "number");
    let postalCode = new InputField("postalCode", "Postal Code", "number");
    let street = new InputField("street", "Street", "text");
    let organization = new InputField("idOrganization", "Organization ID", "number?");

    this.fields = [uuidAtCP, city, country, name, number, postalCode, street, organization];
  }

  ngOnInit() {
    this.facilitiesService.getAllAnnotations().subscribe(response => {
      console.log(response.json());
    });

  }


  openNewFacilityModalWindow() {

    const dialogRef = this.modal.open(ModalNewEntity, overlayConfigFactory({ caller: "Facility", fields: this.fields, formGroup: this.newFacilityForm }, BSModalContext));

    // dialogRef
    //   .then(dialogRef => {
    //     dialogRef.result.then(result => alert(`The result is: ${result}`));
    //   });

  }
}
