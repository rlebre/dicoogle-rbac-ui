
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { HttpClient } from '../HttpAuthTokenInterceptor.service';

@Injectable()
export class LoginService {
  private url: string;
  private dev = true;

  private loginEndpoint = "login";
  private logoutEndpoint = "logout";


  constructor(private http: HttpClient) {
    if (this.dev) {
      this.url = "http://localhost:8080/multi_archive/";
    } else {
      this.url = window.location.origin + "/multi_archive/";
    }
  }

  login(username: string, password: string) {
    return this.http.post(this.url + this.loginEndpoint, JSON.stringify({ username: username, password: password }));
  }

  logout() {
    return this.http.post(this.url + this.logoutEndpoint, {});
  }
}