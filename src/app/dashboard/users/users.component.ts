import { Component, OnInit } from '@angular/core';

import { Modal, BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { Overlay, overlayConfigFactory } from 'ngx-modialog';
import { ModalNewEntity, InputField } from '../modal-new-entity/modal-new-entity.component';

import { FormBuilder, Validators } from '@angular/forms';

import { HttpClient } from '../../HttpApiMiddleware.service';

import { Observable } from 'rxjs/Rx';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  fields: InputField[];
  dataAvailable: boolean;
  tableData: any;
  isRefreshing = false;
  timer;
  apiEndpoint: String;
  idToDelete: Number;
  showDialogDeleteConfirmation = false;
  showDialogErrorGettingAllUsers = false;
  errorMessage: String;
  caller: String;

  constructor(public fb: FormBuilder, public modal: Modal, private crudService: HttpClient) {
    let title = new InputField("title", "Title", "dropdown", ["Mr.", "Dr.", "Mrs.", "Dra."]);
    let firstName = new InputField("firstName", "First Name", "text");
    let lastName = new InputField("lastName", "Last Name", "text");
    let email = new InputField("email", "E-mail", "text");
    let password = new InputField("password", "Password", "password");

    this.fields = [title, firstName, lastName, email, password];

    this.apiEndpoint = "users";
    this.caller = "User";
  }

  ngOnInit() {
    this.requestAllUsersFromServer();
  }


  openNewObjectModalWindow() {
    let newObjectForm = this.fb.group({
      title: ["", Validators.compose([Validators.minLength(2), Validators.required])],
      firstName: ["", Validators.compose([Validators.minLength(3), Validators.required])],
      lastName: ["", Validators.compose([Validators.minLength(3), Validators.required])],
      email: ["", Validators.compose([Validators.minLength(3), Validators.required, Validators.email])],
      password: ["", Validators.compose([Validators.minLength(3), Validators.required])]
    });

    const dialogRef = this.modal.open(ModalNewEntity,
      overlayConfigFactory({ caller: this.caller, apiName: this.apiEndpoint, fields: this.fields, formGroup: newObjectForm }, BSModalContext));
    dialogRef
      .then(dialogRef => {
        dialogRef.result.then(result => this.refresh());
      });
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

    this.requestAllUsersFromServer();
  }

  tickerFunc(tick) {
    this.isRefreshing = false;
  }

  requestAllUsersFromServer() {
    this.crudService.getAll(this.apiEndpoint).subscribe(
      response => {
        this.fillTableWithReceivedData(response.json());
      },
      err => {
        this.errorMessage = err.status + " - " + err.statusText;
        this.showDialogErrorGettingAllUsers = true;
      });
  }

  editObject(user: any) {
    var form = this.fb.group({
      title: [user.title, Validators.compose([Validators.minLength(2), Validators.required])],
      firstName: [user.firstName, Validators.compose([Validators.minLength(3), Validators.required])],
      lastName: [user.lastName, Validators.compose([Validators.minLength(3), Validators.required])],
      email: [user.email, Validators.compose([Validators.minLength(3), Validators.required, Validators.email])],
      password: [user.password, Validators.compose([Validators.minLength(3), Validators.required])]
    })

    const dialogRef = this.modal.open(ModalNewEntity, overlayConfigFactory({ caller: this.caller, apiName: this.apiEndpoint, fields: this.fields, formGroup: form, aa: this.refresh }, BSModalContext));
    dialogRef
      .then(dialogRef => {
        dialogRef.result.then(result => this.refresh());
      });
  }

  deleteObject(user: any) {
    this.showDialogDeleteConfirmation = true;
    this.idToDelete = user.id;
  }

  showDialogErrorCloseClick() {
    this.showDialogErrorGettingAllUsers = false;
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

  rowClick(user: any) {
    console.log(user);
  }
}



