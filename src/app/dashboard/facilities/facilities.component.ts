import { Component, OnInit } from '@angular/core';

import { Modal, BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { Overlay, overlayConfigFactory } from 'ngx-modialog';
import { ModalNewEntity } from './modal-new-facility/modal-new-facility.component';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.css'],
  providers: [Modal]
})
export class FacilitiesComponent implements OnInit {

  fields = ["AutoUnlockWS", "City", "Country", "Name", "Number", "Postal Code", "Street", "UUID"];


  constructor(public modal: Modal) { }

  ngOnInit() {
  }


  openNewFacilityModalWindow() {

    const dialogRef = this.modal.open(ModalNewEntity, overlayConfigFactory({ caller: "Facility", fields: this.fields }, BSModalContext));

    // dialogRef
    //   .then(dialogRef => {
    //     dialogRef.result.then(result => alert(`The result is: ${result}`));
    //   });

  }
}
