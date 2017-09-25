import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpClient } from '../../HttpApiMiddleware.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  id: number;
  sub: any;
  user: any;
  showDialogDeleteConfirmation = false;
  showDialogErrorGettingAllUsers = false;
  errorMessage: String;
  apiEndpoint: String;

  organizations: any[];
  facilities: any[];
  roles: any[];
  permissions: any[];

  userOrganizations: any[];
  userFacilities: any[];
  userRoles: any[];
  userPermissions: any[];

  userDataAvailable: boolean;


  @ViewChild('selOrganizationsRbac') selOrganizationsRbac;
  @ViewChild('selOrganizationsUser') selOrganizationsUser;
  @ViewChild('selFacilitiesRbac') selFacilitiesRbac;
  @ViewChild('selFacilitiesUser') selFacilitiesUser;
  @ViewChild('selRolesRbac') selRolesRbac;
  @ViewChild('selRolesUser') selRolesUser;
  @ViewChild('selPermissionsRbac') selPermissionsRbac;
  @ViewChild('selPermissionsUser') selPermissionsUser;

  selectedValues: { [index: string]: any; } = {};

  constructor(private route: ActivatedRoute, private crudService: HttpClient, private router: Router) {
    this.apiEndpoint = "users";
    this.userDataAvailable = false;

    this.selectedValues["organizations"] = [];
    this.selectedValues["facilities"] = [];
    this.selectedValues["roles"] = [];
    this.selectedValues["permissions"] = [];
    this.selectedValues["userOrganizations"] = [];
    this.selectedValues["userFacilities"] = [];
    this.selectedValues["userRoles"] = [];
    this.selectedValues["userPermissions"] = [];
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      this.requestUserDetails();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  requestUserDetails() {
    this.crudService.getById(this.apiEndpoint, this.id).subscribe(
      response => {
        this.user = response.json();
        this.userDataAvailable = true;

        this.getUserData();
      },
      err => {
        this.errorMessage = err.status + " - " + err.statusText;
        this.showDialogErrorGettingAllUsers = true;
      });
  }


  deleteObject(user: any) {
    this.showDialogDeleteConfirmation = true;
  }

  showDialogErrorCloseClick() {
    this.showDialogErrorGettingAllUsers = false;
  }

  deleteConfirmationYes() {
    this.crudService.deleteById(this.apiEndpoint, this.id).subscribe(response => {
      this.showDialogDeleteConfirmation = false;
      this.router.navigate(['dashboard/users']);
    });
  }

  deleteConfirmationNo() {
    this.showDialogDeleteConfirmation = false;
  }

  getUserData() {
    this.getOrganizations();
    this.getFacilities();
    this.getRoles();
    this.getPermissions();

    this.getUserOrganizations();
    this.getUserFacilities();
    this.getUserRoles();
    this.getUserPermissions();
  }

  getOrganizations() {
    this.crudService.getAll("organizations").subscribe(response => {
      this.organizations = response.json();
      this.removeUserEntityFromEntities(this.organizations, this.userOrganizations);
    });
  }

  getFacilities() {
    this.crudService.getAll("facilities").subscribe(response => {
      this.facilities = response.json();
      this.removeUserEntityFromEntities(this.facilities, this.userFacilities);
    });
  }

  getRoles() {
    this.crudService.getAll("roles").subscribe(response => {
      this.roles = response.json();
      this.removeUserEntityFromEntities(this.roles, this.userRoles);
    });
  }

  getPermissions() {
    this.crudService.getAll("permissions").subscribe(response => {
      this.permissions = response.json();
      this.removeUserEntityFromEntities(this.permissions, this.userPermissions);
    });
  }

  getUserOrganizations() {
    this.crudService.getWithParameters('userOrganizations', { "idUser": this.id }).subscribe(response => {
      this.userOrganizations = response.json();
      this.removeUserEntityFromEntities(this.organizations, this.userOrganizations);
    });
  }

  getUserFacilities() {
    this.crudService.getWithParameters('userFacilities', { "idUser": this.id }).subscribe(response => {
      this.userFacilities = response.json();
      this.removeUserEntityFromEntities(this.facilities, this.userFacilities);
    });
  }

  getUserRoles() {
    this.crudService.getWithParameters('userRoles', { "idUser": this.id }).subscribe(response => {
      this.userRoles = response.json();
      this.removeUserEntityFromEntities(this.roles, this.userRoles);
    });
  }

  getUserPermissions() {
    this.crudService.getWithParameters('userPermissions', { "idUser": this.id }).subscribe(response => {
      this.userPermissions = response.json();
      this.removeUserEntityFromEntities(this.permissions, this.userPermissions);
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

  addOrganization() {
    for (let idOrganization of this.selectedValues["organizations"]) {
      this.crudService.postWithParameters('userToOrganization', { "idOrganization": idOrganization, "idUser": this.id }).subscribe(response => {
        if (response.status === 200) {
          this.organizations.map(function (element) {
            if (+element.id === +idOrganization) {
              this.userOrganizations.push(element);
            }
          }, this);

          this.organizations = this.organizations.filter(function (element) {
            return +element.id !== +idOrganization;
          });
        }
      });
    }
  }

  removeOrganization() {
    for (let idOrganization of this.selectedValues["userOrganizations"]) {
      this.crudService.deleteWithParameters('userToOrganization', { "idOrganization": idOrganization, "idUser": this.id }).subscribe(response => {
        if (response.status === 200) {
          this.userOrganizations.map(function (element) {
            if (+element.id === +idOrganization) {
              this.organizations.push(element);
            }
          }, this);

          this.userOrganizations = this.userOrganizations.filter(function (element) {
            return +element.id !== +idOrganization;
          });
        }
      });
    }
  }

  multiSelectionChanged(options: any, entity: any) {
    this.selectedValues[entity] = Array.apply(null, options)
      .filter(option => option.selected)
      .map(option => option.value);
  }

  addFacility() {
    for (let idFacility of this.selectedValues["facilities"]) {
      this.crudService.postWithParameters('userToFacility', { "idFacility": idFacility, "idUser": this.id }).subscribe(response => {
        if (response.status === 200) {
          this.facilities.map(function (element) {
            if (+element.id === +idFacility) {
              this.userFacilities.push(element);
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
    for (let idFacility of this.selectedValues["userFacilities"]) {
      this.crudService.deleteWithParameters('userToFacility', { "idFacility": idFacility, "idUser": this.id }).subscribe(response => {
        if (response.status === 200) {
          this.userFacilities.map(function (element) {
            if (+element.id === +idFacility) {
              this.facilities.push(element);
            }
          }, this);

          this.userFacilities = this.userFacilities.filter(function (element) {
            return +element.id !== +idFacility;
          });
        }
      });
    }
  }

  addRole() {
    for (let idRole of this.selectedValues["roles"]) {
      this.crudService.postWithParameters('roleToUser', { "idRole": idRole, "idUser": this.id }).subscribe(response => {
        if (response.status === 200) {
          this.roles.map(function (element) {
            if (+element.id === +idRole) {
              this.userRoles.push(element);
            }
          }, this);

          this.roles = this.roles.filter(function (element) {
            return +element.id !== +idRole;
          });
        }
      });
    }
  }

  removeRole() {
    for (let idRole of this.selectedValues["userRoles"]) {
      this.crudService.deleteWithParameters('roleToUser', { "idRole": idRole, "idUser": this.id }).subscribe(response => {
        if (response.status === 200) {
          this.userRoles.map(function (element) {
            if (+element.id === +idRole) {
              this.roles.push(element);
            }
          }, this);

          this.userRoles = this.userRoles.filter(function (element) {
            return +element.id !== +idRole;
          });
        }
      });
    }
  }


  addPermission() {
    for (let idPermission of this.selectedValues["permissions"]) {
      this.crudService.postWithParameters('userToPermission', { "idPermission": idPermission, "idUser": this.id }).subscribe(response => {
        if (response.status === 200) {
          this.permissions.map(function (element) {
            if (+element.id === +idPermission) {
              this.userPermissions.push(element);
            }
          }, this);

          this.permissions = this.permissions.filter(function (element) {
            return +element.id !== +idPermission;
          });
        }
      });
    }
  }

  removePermission() {
    for (let idPermission of this.selectedValues["userPermissions"]) {
      this.crudService.deleteWithParameters('userToPermission', { "idPermission": idPermission, "idUser": this.id }).subscribe(response => {
        if (response.status === 200) {
          this.userPermissions.map(function (element) {
            if (+element.id === +idPermission) {
              this.permissions.push(element);
            }
          }, this);

          this.userPermissions = this.userPermissions.filter(function (element) {
            return +element.id !== +idPermission;
          });
        }
      });
    }
  }
}
