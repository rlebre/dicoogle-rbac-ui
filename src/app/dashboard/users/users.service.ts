import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { HttpClient } from '../../HttpAuthTokenInterceptor.service';

@Injectable()
export class UsersService {
  private url: string;
  private dev = true;

  constructor(private http: HttpClient) {
    if (this.dev) {
      this.url = "http://localhost:8080/multi_archive/";
    } else {
      this.url = window.location.origin + "/multi_archive/";
    }
  }

  getAll(endpoint: String) {
    return this.http.get(this.url + endpoint);
  }

  getByName(endpoint: String, name: String) {
    let urlAndEndpoint = this.url + endpoint;
    let nameParameter = "?name=" + name;
    return this.http.get(urlAndEndpoint + nameParameter);
  }

  getById(endpoint: String, id: String) {
    let urlAndEndpoint = this.url + endpoint;
    let idParameter = "?id=" + id;
    return this.http.get(urlAndEndpoint + idParameter);
  }

  delete(endpoint: String, id: Number) {
    let urlAndEndpoint = this.url + endpoint;
    return this.http.delete(urlAndEndpoint + "?id=" + id);
  }
}
