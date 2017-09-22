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
    //this.selectedEntityService.selectedSection = "facilities";
    this.router.navigate(['/dashboard/facilities']);
  }

  organizationsClick() {
    //this.selectedEntityService.selectedSection = "organizations";
    this.router.navigate(['/dashboard/organizations']);
  }

  usersClick() {
    //this.selectedEntityService.selectedSection = "users";
    this.router.navigate(['/dashboard/users']);
  }

  rolesClick() {
    // this.selectedEntityService.selectedSection = "roles";
    this.router.navigate(['/dashboard/roles']);    
  }

  permissionsClick() {
    this.router.navigate(['/dashboard/permissions']);
    //this.selectedEntityService.selectedSection = "permissions";
  }

  operationsClick() {
    //this.selectedEntityService.selectedSection = "operations";
    this.router.navigate(['/dashboard/operations']);    
  }

  categoriesClick() {
    this.router.navigate(['/dashboard/categories']);    
    //this.selectedEntityService.selectedSection = "categories";
  }

  resourcesClick() {
    this.router.navigate(['/dashboard/resources']);    
    //this.selectedEntityService.selectedSection = "resources";
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
