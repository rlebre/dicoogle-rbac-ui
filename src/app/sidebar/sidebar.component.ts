import { Component, OnInit } from '@angular/core';

import { SelectedEntityService } from './selected-entity/selected-entity.service'
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  arrayOfSections = ['Facilities', 'Organizations', 'Users', 'Roles', 'Permissions', 'Operations', 'Categories'];
  toggled = true;

  constructor(private selectedEntityService: SelectedEntityService, private loginService: LoginService, private router: Router) { }

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

  logoutClick() {
    this.loginService.logout()
      .subscribe(
      res => {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/']);
      },
      error => {
        alert(error);
      });
  }
}
