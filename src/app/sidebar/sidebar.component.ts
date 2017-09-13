import { Component, OnInit } from '@angular/core';

import { SelectedEntityService } from './selected-entity/selected-entity.service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  arrayOfSections = ['Facilities', 'Organizations', 'Users', 'Roles', 'Permissions', 'Operations', 'Categories'];
  toggled = true;

  constructor(private selectedEntityService: SelectedEntityService) { }

  ngOnInit() {
  }

  toggleLeft(event: any) {
    this.toggled = !this.toggled;
  }

  facilitiesClick() {
    this.selectedEntityService.selectedSection = "facilities";
  }

  organizationsClick() {
    this.selectedEntityService.selectedSection = "organizations";
  }

  usersClick() {
    this.selectedEntityService.selectedSection = "users";
  }

  rolesClick() {
    this.selectedEntityService.selectedSection = "roles";
  }

  permissionsClick() {
    this.selectedEntityService.selectedSection = "permissions";
  }

  operationsClick() {
    this.selectedEntityService.selectedSection = "operations";
  }

  categoriesClick() {
    this.selectedEntityService.selectedSection = "categories";
  }
}
