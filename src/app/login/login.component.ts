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

  constructor(private loginService: HttpClient, private router: Router) { }

  ngOnInit() {

  }

  login() {
    this.loading = true;
    this.loginService.login(this.model.username, this.model.password)
      .subscribe(
      res => {
        localStorage.setItem("currentUser", res.json().token);
        this.router.navigate(['/']);
      },
      error => {
        alert(error);
        this.loading = false;
      });
  }
}
