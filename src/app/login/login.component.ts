import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(private loginService: LoginService) { }

  ngOnInit() {

  }

  login() {
    this.loading = true;
    this.loginService.login(this.model.username, this.model.password)
      .subscribe(
      res => {
        localStorage.setItem("currentUser", res.json().token);
        // this.router.navigate([this.returnUrl]);
      },
      error => {
        // this.alertService.error(error);
        console.log(error);
        this.loading = false;
      });
  }
}
