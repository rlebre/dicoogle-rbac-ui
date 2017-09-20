import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient } from '../HttpApiMiddleware.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;
  showLoginIncorrectWindow = false;
  showLoginErrorWindow = false;
  loginErrorWindowMessage: String;

  constructor(private loginService: HttpClient, private router: Router) { }

  ngOnInit() {

  }

  login() {
    this.loading = true;
    this.loginService.login(this.model.username, this.model.password)
      .subscribe(
      res => {
        let resJson = res.json();

        if (resJson.status == 'success') {
          localStorage.setItem("currentUser", res.json().token);
          this.router.navigate(['/']);
        } else if (resJson.status == 'error') {
          this.showLoginIncorrectWindow = true;
        }
      },
      error => {
        if (error.status == '0') {
          this.loginErrorWindowMessage = "Login server is down";
        } else {
          this.loginErrorWindowMessage = error;
        }
        this.showLoginErrorWindow = true;
      });
  }

  showDialogErrorCloseClick() {
    this.showLoginIncorrectWindow = false;
    this.showLoginErrorWindow = false;
    this.loading = false;
  }
}
