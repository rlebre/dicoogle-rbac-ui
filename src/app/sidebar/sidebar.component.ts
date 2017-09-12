import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  arrayOfSections = ['Facilities', 'Organizations', 'Users', 'Roles', 'Permissions', 'Operations', 'Categories'];
  toggled = true;

  constructor() { }

  ngOnInit() {
  }

  toggleLeft(event: any) {
    this.toggled = !this.toggled;
  }

}
