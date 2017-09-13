import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { HttpClient } from '../../HttpAuthTokenInterceptor.service';

@Injectable()
export class FacilitiesService {

  private url: string;
  private dev = true;


  constructor(private http: HttpClient) {
    if (this.dev) {
      this.url = "http://localhost:8080/multi_archive/facilities";
    } else {
      this.url = window.location.origin + "/multi_archive/facilities";
    }
  }

  getAllFacilities() {
    return this.http.get(this.url);
  }

  deleteFacility(id: Number) {
    return this.http.delete(this.url + "?id=" + id);
  }

  // getAnnotationByName() {
  //   return this.http.get(this.url);
  // }

  // getAnnotationById() {
  //   return this.http.get(this.url);
  // }
}
