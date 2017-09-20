import { Component, OnInit } from '@angular/core';

import { SelectedEntityService } from './selected-entity/selected-entity.service'
import { Router } from '@angular/router';
import { HttpClient } from '../HttpApiMiddleware.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(private selectedEntityService: SelectedEntityService, private loginService: HttpClient, private router: Router) { }

  ngOnInit() {
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

  resourcesClick() {
    this.selectedEntityService.selectedSection = "resources";
  }

  logoutClick() {
    this.loginService.logout()
      .subscribe(
      res => {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/']);
      },
      error => {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/']);
      });
  }
}
