
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class LoginService {
  private url: string;
  private dev = true;

  constructor(private http: Http) {
    if (this.dev) {
      this.url = "http://localhost:8080/multi_archive/login";
    } else {
      this.url = window.location.origin + "/multi_archive/login";
    }
  }

  login(username: string, password: string) {
    return this.http.post(this.url, JSON.stringify({ username: username, password: password }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}