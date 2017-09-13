import { Component, OnInit } from '@angular/core';

import { SelectedEntityService } from '../sidebar/selected-entity/selected-entity.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  title = 'app';

  private _opened = true;

  private _toggleSidebar() {
    this._opened = !this._opened;
    console.log(this._opened);
  }

  constructor(private selectedEntityService: SelectedEntityService) { }

  ngOnInit() {
  }

}
