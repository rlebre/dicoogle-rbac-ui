import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';

import { HttpClient } from '../../HttpApiMiddleware.service';

import { Observable } from 'rxjs/Rx';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {
  dataAvailable: boolean;
  tableData: any;
  isRefreshing = false;
  timer;
  apiEndpoint: String;
  idToDelete: Number;
  showDialogDeleteConfirmation = false;
  showDialogErrorGettingAllCategories = false;
  errorMessage: String;
  caller: String;

  constructor(private crudService: HttpClient) {
    this.apiEndpoint = "resources";
    this.caller = "Resource";
  }

  ngOnInit() {
    this.requestAllResourcesFromServer();
  }

  fillTableWithReceivedData(jsonList) {
    if (jsonList.length === 0) {
      this.dataAvailable = false;
      return;
    }

    this.tableData = jsonList;
    this.dataAvailable = true;
  }


  refresh() {
    this.isRefreshing = true;
    this.timer = Observable.timer(1000);
    this.timer.subscribe(t => this.tickerFunc(t));

    this.requestAllResourcesFromServer();
  }

  tickerFunc(tick) {
    this.isRefreshing = false;
  }

  requestAllResourcesFromServer() {
    this.crudService.getAll(this.apiEndpoint).subscribe(
      response => {
        this.fillTableWithReceivedData(response.json());
      },
      err => {
        this.errorMessage = err.status + " - " + err.statusText;
        this.showDialogErrorGettingAllCategories = true;
      });
  }

  deleteObject(category: any) {
    this.showDialogDeleteConfirmation = true;
    this.idToDelete = category.id;
  }

  showDialogErrorCloseClick() {
    this.showDialogErrorGettingAllCategories = false;
  }

  deleteConfirmationYes() {
    this.crudService.deleteById(this.apiEndpoint, this.idToDelete).subscribe(response => {
      this.refresh();
      this.showDialogDeleteConfirmation = false;
    });
  }

  deleteConfirmationNo() {
    this.showDialogDeleteConfirmation = false;
  }
}