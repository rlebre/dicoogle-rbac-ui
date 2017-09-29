import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpClient } from '../../HttpApiMiddleware.service';

@Component({
  selector: 'app-roles-details',
  templateUrl: './roles-details.component.html',
  styleUrls: ['./roles-details.component.css']
})
export class RolesDetailsComponent implements OnInit, OnDestroy {
  id: number;
  sub: any;
  role: any;
  showDialogDeleteConfirmation = false;
  showDialogErrorGettingAllRoles = false;
  errorMessage: String;
  apiEndpoint: String;

  permissions: any[];
  rolePermissions: any[];

  roleDataAvailable: boolean;

  showDialogPermissionDetails = false;
  dblClickPermission: any;

  @ViewChild('selPermissionsRbac') selPermissionsRbac;
  @ViewChild('selPermissionsRole') selPermissionsRole;


  selectedValues: { [index: string]: any; } = {};

  constructor(private route: ActivatedRoute, private crudService: HttpClient, private router: Router) {
    this.apiEndpoint = "roles";
    this.roleDataAvailable = false;

    this.selectedValues["permissions"] = [];
    this.selectedValues["rolePermissions"] = [];
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      this.requestRoleDetails();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  requestRoleDetails() {
    this.crudService.getById(this.apiEndpoint, this.id).subscribe(
      response => {
        this.role = response.json();
        this.roleDataAvailable = true;

        this.getRoleData();
      },
      err => {
        this.errorMessage = err.status + " - " + err.statusText;
        this.showDialogErrorGettingAllRoles = true;
      });
  }


  deleteObject() {
    this.showDialogDeleteConfirmation = true;
  }

  showDialogErrorCloseClick() {
    this.showDialogErrorGettingAllRoles = false;
  }

  deleteConfirmationYes() {
    this.crudService.deleteById(this.apiEndpoint, this.id).subscribe(response => {
      this.showDialogDeleteConfirmation = false;
      this.router.navigate(['dashboard/roles']);
    });
  }

  deleteConfirmationNo() {
    this.showDialogDeleteConfirmation = false;
  }

  getRoleData() {
    this.getPermissions();
    this.getRolePermissions();
  }

  getPermissions() {
    this.crudService.getAll("permissions").subscribe(response => {
      this.permissions = response.json();
      this.removeUserEntityFromEntities(this.permissions, this.rolePermissions);
    });
  }

  getRolePermissions() {
    this.crudService.getWithParameters('rolePermissions', { "idRole": this.id }).subscribe(response => {
      this.rolePermissions = response.json();
      this.removeUserEntityFromEntities(this.permissions, this.rolePermissions);
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

  addPermission() {
    for (let idPermission of this.selectedValues["permissions"]) {
      this.crudService.postWithParameters('permissionToRole', { "idPermission": idPermission, "idRole": this.id }).subscribe(response => {
        if (response.status === 200) {
          this.permissions.map(function (element) {
            if (+element.id === +idPermission) {
              this.rolePermissions.push(element);
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
    for (let idPermission of this.selectedValues["rolePermissions"]) {
      this.crudService.deleteWithParameters('permissionToRole', { "idPermission": idPermission, "idRole": this.id }).subscribe(response => {
        if (response.status === 200) {
          this.rolePermissions.map(function (element) {
            if (+element.id === +idPermission) {
              this.permissions.push(element);
            }
          }, this);

          this.rolePermissions = this.rolePermissions.filter(function (element) {
            return +element.id !== +idPermission;
          });
        }
      });
    }
  }

  permissionDblClick(dblClickId) {
    this.crudService.getById('permissions', dblClickId).subscribe(response => {
      this.dblClickPermission = response.json();
      console.log(this.dblClickPermission);
      this.showDialogPermissionDetails = true;
    });
  }

  permissionDetailsCloseClick() {
    this.showDialogPermissionDetails = false;
  }
}
