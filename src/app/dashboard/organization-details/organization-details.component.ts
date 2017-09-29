import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpClient } from '../../HttpApiMiddleware.service';

@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.css']
})
export class OrganizationDetailsComponent implements OnInit, OnDestroy {
  id: number;
  sub: any;
  organization: any;
  showDialogDeleteConfirmation = false;
  showDialogErrorGettingAllFacilities = false;
  errorMessage: String;
  apiEndpoint: String;

  facilities: any[];
  organizationFacilities: any[];

  organizationDataAvailable: boolean;

  @ViewChild('selFacilitiesRbac') selFacilitiesRbac;
  @ViewChild('selFacilitiesOrganization') selFacilitiesOrganization;
  selectedValues: { [index: string]: any; } = {};


  constructor(private route: ActivatedRoute, private crudService: HttpClient, private router: Router) {
    this.apiEndpoint = "organizations";
    this.organizationDataAvailable = false;

    this.selectedValues["facilities"] = [];
    this.selectedValues["organizationFacilities"] = [];
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      this.requestOrganizationDetails();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  requestOrganizationDetails() {
    this.crudService.getById(this.apiEndpoint, this.id).subscribe(
      response => {
        this.organization = response.json();
        this.organizationDataAvailable = true;

        this.getOrganizationData();
      },
      err => {
        this.errorMessage = err.status + " - " + err.statusText;
        this.showDialogErrorGettingAllFacilities = true;
      });
  }


  deleteObject() {
    this.showDialogDeleteConfirmation = true;
  }

  showDialogErrorCloseClick() {
    this.showDialogErrorGettingAllFacilities = false;
  }

  deleteConfirmationYes() {
    this.crudService.deleteById(this.apiEndpoint, this.id).subscribe(response => {
      this.showDialogDeleteConfirmation = false;
      this.router.navigate(['dashboard/organizations']);
    });
  }

  deleteConfirmationNo() {
    this.showDialogDeleteConfirmation = false;
  }

  getOrganizationData() {
    this.getFacilities();
    this.getOrganizationFacilities();
  }

  getFacilities() {
    this.crudService.getAll("facilities").subscribe(response => {
      this.facilities = response.json();
      this.removeUserEntityFromEntities(this.facilities, this.organizationFacilities);
    });
  }

  getOrganizationFacilities() {
    this.crudService.getWithParameters('organizationFacilities', { "idOrganization": this.id }).subscribe(response => {
      this.organizationFacilities = response.json();
      this.removeUserEntityFromEntities(this.facilities, this.organizationFacilities);
    });
  }

  removeUserEntityFromEntities(entities, userEntities) {
    if (entities != undefined && userEntities != undefined) {
      for (let userEntity of userEntities) {
        entities.filter(function (element) {
          if (+element.id === +userEntity.id) {
            entities.splice(entities.indexOf(element), 1);
          }
        });
      }
    }
  }


  multiSelectionChanged(options: any, entity: any) {
    this.selectedValues[entity] = Array.apply(null, options)
      .filter(option => option.selected)
      .map(option => option.value);
  }

  addFacility() {
    for (let idFacility of this.selectedValues["facilities"]) {
      this.crudService.postWithParameters('facilityToOrganization', { "idFacility": idFacility, "idOrganization": this.id }).subscribe(response => {
        if (response.status === 200) {
          this.facilities.map(function (element) {
            if (+element.id === +idFacility) {
              this.organizationFacilities.push(element);
            }
          }, this);

          this.facilities = this.facilities.filter(function (element) {
            return +element.id !== +idFacility;
          });
        }
      });
    }
  }

  removeFacility() {
    for (let idFacility of this.selectedValues["organizationFacilities"]) {
      this.crudService.deleteWithParameters('facilityToOrganization', { "idFacility": idFacility, "idOrganization": this.id }).subscribe(response => {
        if (response.status === 200) {
          this.organizationFacilities.map(function (element) {
            if (+element.id === +idFacility) {
              this.facilities.push(element);
            }
          }, this);

          this.organizationFacilities = this.organizationFacilities.filter(function (element) {
            return +element.id !== +idFacility;
          });
        }
      });
    }
  }
}
